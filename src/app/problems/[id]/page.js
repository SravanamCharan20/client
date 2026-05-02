'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import api from '../../../lib/api';
import ProblemPanel from '../../../components/ProblemPanel';
import AnswerSection from '../../../components/AnswerSection';
import DiagramCanvas from '../../../components/DiagramCanvas';
import FeedbackPanel from '../../../components/FeedbackPanel';
import { PencilRuler } from 'lucide-react';
import { useStore } from '../../../store/useStore';

export default function ProblemSolver() {
  const { id } = useParams();
  const router = useRouter();
  const token = useStore((state) => state.token);
  const setToken = useStore((state) => state.setToken);
  
  const [problem, setProblem] = useState(null);
  const [answers, setAnswers] = useState({});
  const diagramRef = useRef(null);
  const [initialDiagram, setInitialDiagram] = useState(null);
  const [feedback, setFeedback] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = localStorage.getItem('designcode_token');
      if (!token && !storedToken) {
        router.push('/login');
        return;
      }
      if (!token && storedToken) {
        setToken(storedToken);
      }

      try {
        const probRes = await api.get(`/problems/${id}`);
        if (probRes.data.success) {
          setProblem(probRes.data.data.problem);
        }

        const subRes = await api.get(`/submissions/${id}`);
        if (subRes.data.success && subRes.data.data.submission) {
          const sub = subRes.data.data.submission;
          setAnswers(sub.answers || {});
          diagramRef.current = sub.diagram || null;
          setInitialDiagram(sub.diagram || null);
          if (sub.status === 'completed' && sub.aiFeedback) {
            setFeedback(sub.aiFeedback);
          }
        }
      } catch (err) {
        setError('Failed to load problem');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router, setToken, token]);

  const saveDraft = async (currentAnswers, currentDiagram) => {
    setSaving(true);
    try {
      await api.post('/submissions/save', {
        problemId: id,
        answers: currentAnswers,
        diagram: currentDiagram
      });
    } catch (err) {
      console.error("Failed to save draft", err);
    } finally {
      setSaving(false);
    }
  };

  const debouncedSave = useDebouncedCallback((currentAnswers, currentDiagram) => {
    saveDraft(currentAnswers, currentDiagram);
  }, 2000);

  const handleAnswersChange = (newAnswers) => {
    setAnswers(newAnswers);
    debouncedSave(newAnswers, diagramRef.current);
  };

  const handleDiagramChange = (newDiagram) => {
    diagramRef.current = newDiagram;
    debouncedSave(answers, newDiagram);
  };

  const handleSubmit = async () => {
    setError('');
    setSubmitting(true);
    try {
      const response = await api.post('/submissions/submit', {
        problemId: id,
        answers,
        diagram: diagramRef.current
      });
      if (response.data.success) {
        setFeedback(response.data.data.aiFeedback);
        setShowFeedback(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const isComplete = problem?.sections?.every(sec => (answers[sec]?.trim().length || 0) >= 20);

  if (loading) return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
  if (!problem) return <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', color: 'var(--error)' }}>{error || 'Problem not found'}</div>;

  return (
    <div className="solver-layout" style={{ position: 'relative' }}>
      <ProblemPanel problem={problem} />

      <div className="solver-panel answer-workspace">
        <div className="answer-scroll">
          <AnswerSection sections={problem.sections} answers={answers} onChange={handleAnswersChange} />
        </div>
        
        <div className="solver-action-bar">
          <div className="action-status">
            {saving ? 'Saving...' : 'Draft saved'}
          </div>
          <div className="action-controls">
            {error && <span className="inline-error">{error}</span>}
            {feedback && (
              <button className="btn-secondary" onClick={() => setShowFeedback(true)}>
                View AI Feedback
              </button>
            )}
            <button 
              className="btn-primary" 
              onClick={handleSubmit} 
              disabled={!isComplete || submitting}
            >
              {submitting ? 'Evaluating...' : 'Submit & Get AI Feedback'}
            </button>
          </div>
        </div>
      </div>

      <div className="solver-panel diagram-panel">
        <div className="diagram-toolbar">
          <div>
            <h2>Drawing Board</h2>
            <p>Map services, data stores, queues, and request flow.</p>
          </div>
          <div className="diagram-hint">
            <PencilRuler size={16} />
            Sketch updates save with the draft
          </div>
        </div>
        <DiagramCanvas initialData={initialDiagram} onChange={handleDiagramChange} />
      </div>

      {showFeedback && <FeedbackPanel feedback={feedback} onClose={() => setShowFeedback(false)} />}
    </div>
  );
}
