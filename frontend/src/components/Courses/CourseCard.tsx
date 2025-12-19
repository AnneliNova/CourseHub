import React from 'react';
import { formatCreationDate, formatDuration } from '../../utils/formatters';

interface CourseCardProps {
  id: string | number;
  title: string;
  description: string;
  duration: number;
  authors: string[];
  creationDate: string;
  onShow?: () => void;
  onDelete?: () => void;
  canDelete?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  duration,
  authors,
  creationDate,
  onShow,
  onDelete,
  canDelete,
}) => {
  const formattedDuration = formatDuration(duration);
  const formattedDate = formatCreationDate(creationDate);
  const authorsText = authors?.length ? authors.join(', ') : 'No authors';

  return (
    <article className="course-card">
      <div className="course-card__main">
        <h2 className="course-card__title">{title}</h2>
        <p className="course-card__desc">{description}</p>
      </div>

      <div className="course-card__meta">
        <div className="course-card__kv">
          <div className="course-card__row">
            <strong>Duration:</strong>
            <span>{formattedDuration}</span>
          </div>

          <div className="course-card__row">
            <strong>Created:</strong>
            <span>{formattedDate}</span>
          </div>

          <div className="course-card__authors">
            <strong>Authors:</strong>
            <div className="course-card__authorsText" title={authorsText}>
              {authorsText}
            </div>
          </div>
        </div>

        <div className="course-card__actions">
          <button type="button" onClick={onShow}>
            Show course
          </button>

          {canDelete ? (
            <button type="button" className="danger" onClick={onDelete}>
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
