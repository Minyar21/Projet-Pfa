import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import './report.css';
import ContentHeader from './header';  

const mockReports = [
  { id: 1, title: 'Rapport Mensuel Janvier', date: '2024-01-31', description: 'Analyse des performances du mois de janvier.' },
  { id: 2, title: 'Rapport Mensuel Février', date: '2024-02-28', description: 'Analyse des performances du mois de février.' },
  { id: 3, title: 'Rapport Trimestriel Q1', date: '2024-03-31', description: 'Analyse des performances du premier trimestre.' },
];

function Report() {
  const [reports, setReports] = useState(mockReports);

  return (
    <div className='header'>
      <ContentHeader />
      <div className="report-page">
        <h2>Consulter les Rapports</h2>
        <div className="report-list">
          {reports.map(report => (
            <div key={report.id} className="report-card">
              <FontAwesomeIcon icon={faFileAlt} size="3x" />
              <div className="report-details">
                <h3>{report.title}</h3>
                <p><strong>Date:</strong> {report.date}</p>
                <p>{report.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Report;
