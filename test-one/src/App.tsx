// Import React hooks
import { useState, useEffect } from 'react';
// Import raw JSON data containing project information
import projectDataRaw from './data.json';

// Define the structure of a project object using TypeScript interface
interface ProjectInfo {
  projSerialNumber: string;
  jobNumber: string;
  name: string;
  contractor: string;
  status: 'A' | 'B' | 'C' | 'D'; // Status categories
}

// Cast the imported JSON data to the ProjectInfo[] type
const projectData = projectDataRaw as ProjectInfo[];

export function App() {
  // Store all projects (initially loaded from JSON)
  const [projects, setProjects] = useState<ProjectInfo[]>(projectData);

  // Store the user's text input for filtering project names
  const [filter, setFilter] = useState('');

  // Store the list of projects that match the filter
  const [filteredProjects, setFilteredProjects] = useState<ProjectInfo[]>([]);

  // Initialize the projects state (runs once on mount)
  useEffect(() => {
    setProjects(projectData);
  }, []);

  // Update filteredProjects whenever filter or projects change
  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, projects]);

  // Render a table of projects for a specific status
  const renderTable = (status: string) => {
    // Filter projects by the current status
    const projectsByStatus = filteredProjects.filter(
      (project) => project.status === status
    );

    // If no projects match this status, show a message
    if (projectsByStatus.length === 0) {
      return <p key={status}>No projects found with status "{status}".</p>;
    }

    // Render a table with project details for this status
    return (
      <div key={status}>
        <h2>Status: {status}</h2>
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
      </div>
    );
  };

  // Define the list of possible status values to render tables for
  const statuses: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  // Render the filter input and a table for each status
  return (
    <div className="App">
      {/* Input field for filtering projects by name */}
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter projects by name"
      />

      {/* Render a table for each status */}
      {statuses.map((status) => renderTable(status))}
    </div>
  );
}
