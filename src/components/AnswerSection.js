'use client';
import { CheckCircle2 } from 'lucide-react';

export default function AnswerSection({ sections, answers, onChange }) {
  const completedSections = sections?.filter((section) => (answers[section]?.trim().length || 0) >= 20).length || 0;
  const totalSections = sections?.length || 0;

  const handleTextChange = (section, value) => {
    onChange({
      ...answers,
      [section]: value
    });
  };

  return (
    <>
      <div className="answer-header">
        <div>
          <h2 className="answer-title">Architecture Answers</h2>
          <p className="answer-subtitle">Write the design, sketch the flow, then submit for AI feedback.</p>
        </div>
        <div className="progress-pill">
          <CheckCircle2 size={15} />
          {completedSections}/{totalSections} ready
        </div>
      </div>
      
      {sections?.map((section) => (
        <div key={section} className="answer-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label className="input-label" style={{ marginBottom: 0 }}>{section}</label>
            <span className={`section-count ${(answers[section]?.trim().length || 0) >= 20 ? 'complete' : ''}`}>
              {answers[section]?.length || 0}/20 min chars
            </span>
          </div>
          <textarea
            className="input-field"
            value={answers[section] || ''}
            onChange={(e) => handleTextChange(section, e.target.value)}
            placeholder={`Write your ${section} here...`}
          />
        </div>
      ))}
    </>
  );
}
