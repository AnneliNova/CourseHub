import React from 'react';
import { formatDuration, formatCreationDate } from '../../utils/formatters';

interface CourseCardProps {
  id: string | number;
  title: string;
  description: string;
  duration: number;
  authors: string[];
  creationDate: string;
  onShow?: () => void;
  onDelete?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  duration,
  authors,
  creationDate,
  onShow,
  onDelete,
}) => {
  const formattedDuration = formatDuration(duration);
  const formattedDate = formatCreationDate(creationDate);
  const authorsText =
    authors && authors.length > 0 ? authors.join(', ') : 'No authors';

  return (
    <div className="card" style={{ display: 'flex', gap: 16, justifyContent: 'space-between' }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2 style={{ marginBottom: 8 }}>{title}</h2>
        <p style={{ margin: 0, color: 'var(--muted)' }}>{description}</p>
      </div>

      <div style={{ width: 280, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 14, color: 'var(--text)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <strong>Duration:</strong>
            <span>{formattedDuration}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginTop: 6 }}>
            <strong>Created:</strong>
            <span>{formattedDate}</span>
          </div>

          <div style={{ marginTop: 10 }}>
            <strong>Authors:</strong>
            <div style={{ marginTop: 4, color: 'var(--muted)', fontSize: 13 }}>{authorsText}</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 6 }}>
          <button type="button" onClick={onShow}>
            Show course
          </button>
          <button
            type="button"
            onClick={onDelete}
            style={{
              background: 'var(--danger)',
              borderColor: 'rgba(220, 38, 38, 0.25)',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
