import { useState, useEffect } from 'react';
import projectDataRaw from './data.json'; // Raw import

interface ProjectInfo {
  projSerialNumber: string;
  jobNumber: string;
  name: string;
  contractor: string;
  status: 'A' | 'B' | 'C' | 'D';
}

// Type assertion
const projectData = projectDataRaw as ProjectInfo[];

export function App(props: { status: 'A' | 'B' | 'C' | 'D' }) {
  const [projects, setProjects] = useState<ProjectInfo[]>(projectData);
  const [filter, setFilter] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<ProjectInfo[]>([]);

  useEffect(() => {
    setProjects(projectData);
  }, []);

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, projects]); // ✅ also fixed dependency array

  const renderTable = (status: string) => {
    const projectsByStatus = filteredProjects.filter(
      (project) => project.status === status
    );

    if (projectsByStatus.length === 0) {
      return <p>No projects found with status "{status}".</p>;
    }

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
          {projectsByStatus.map((project) => (
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
  };

  return (
    <div className="App">
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
