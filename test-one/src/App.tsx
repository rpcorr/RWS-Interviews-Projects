import React, { useState, useEffect } from 'react';

// An array of objects following ProjectInfo interface
import projectData from './data.json' 

interface ProjectInfo {
    projSerialNumber: string;
    jobNumber: string;
    name: string;
    contractor: string;
    status: 'A' | 'B' | 'C' | 'D';
}

export function App(props) {
  const [projects, setProjects] = useState<ProjectInfo[]>(projectData);
  const [filter, setFilter] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<ProjectInfo[]>([]);

  useEffect(() => {
    setProjects(projectData);
  }, []);

  useEffect(() => {
    setFilteredProjects(projects.filter(project => 
      project.name.toLowerCase().includes(filter.toLowerCase())
    ));
  }, [filter, filteredProjects]);

  const renderTable = (status: string) => {
    return (
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Job Number</th>
            <th>Name</th>
            <th>Contractor</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.map((project) => (
            <tr key={project.projSerialNumber}>
              <td>{project.projSerialNumber}</td>
              <td>{project.jobNumber}</td>
              <td>{project.name}</td>
              <td>{project.contractor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className='App'>
      <input 
        type="text" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        placeholder="Filter projects"
      />
      <h2>Status: {props.status}</h2>
      {renderTable(props.status)}
    </div>
  );
}