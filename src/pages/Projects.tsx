import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode, FaFilter } from 'react-icons/fa';
import '../styles/Projects.css';
// Proje verilerini doğrudan import ediyoruz
import projectsJson from '../data/projects.json';

// Vite için resim importları
import { resolveImagePath } from '../utils/imageUtils';

// Proje tipi tanımı
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  androidUrl?: string;
  iosUrl?: string;
  githubUrl?: string | null;
  featured: boolean;
  category: string;
}

interface ProjectsData {
  projects: Project[];
}

function Projects() {
  // State tanımlamaları
  const [filter, setFilter] = useState<string>('Tümü');
  // Loading durumunu kaldırdık
  
  // JSON'dan projeleri al
  const projectsData: ProjectsData = projectsJson;
  
  // Kategorileri hesapla
  const categories = ['Tümü', ...Array.from(new Set(projectsData.projects.map(project => project.category)))];
  
  // Projeleri filtrele
  const filteredProjects = projectsData.projects.filter(project => 
    filter === 'Tümü' ? true : project.category === filter
  );

  // Loading durumunu tamamen kaldırdık

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1 className="projects-title">Projelerim</h1>
        <p className="projects-subtitle">
          Geliştirdiğim bazı projeler. React, React Native, NestJS ve diğer teknolojilerle oluşturulmuş web ve mobil uygulamalar.
        </p>
      </div>
      
      <div className="projects-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-button ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            <FaFilter className="filter-icon" /> {category}
          </button>
        ))}
      </div>
      
      {filteredProjects.length === 0 ? (
        <div className="no-projects">
          <p>Bu kategoride henüz proje bulunmuyor.</p>
        </div>
      ) : (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              {project.featured && <div className="featured-badge">Öne Çıkan</div>}
              <div className="project-category">{project.category}</div>
              
              <div className="project-image-container">
                <img 
                  src={resolveImagePath(project.image)} 
                  alt={project.title} 
                  className="project-image" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    console.error(`Resim yüklenemedi: ${project.image}`);
                    // Boş bir string atayarak görüntü yükleme denemesini durdur
                    target.src = '';
                    // Hata tekrarını önlemek için onerror'ı temizle
                    target.onerror = null;
                  }}
                />
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="project-tech">
                      <FaCode className="tech-icon" /> {tech}
                    </span>
                  ))}
                </div>
                
                <div className="project-links">
                  {project.category === 'Mobil' ? (
                    <>
                      {project.androidUrl && (
                        <a 
                          href={project.androidUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link project-link-android"
                        >
                          <FaExternalLinkAlt /> Android
                        </a>
                      )}
                      {project.iosUrl && (
                        <a 
                          href={project.iosUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="project-link project-link-ios"
                        >
                          <FaExternalLinkAlt /> iOS
                        </a>
                      )}
                    </>
                  ) : (
                    project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link project-link-live"
                      >
                        <FaExternalLinkAlt /> Canlı
                      </a>
                    )
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link project-link-github"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;
