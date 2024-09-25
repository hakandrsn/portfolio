import { useState } from 'react';
import './AboutMe.css';
import aboutData from '../../constants/about.json';


export const AboutMe = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    return (
        <div className="about-container">
            {aboutData && (
                <>
                    <h1 className="name">{aboutData.name}</h1>
                    <h2 className="title">{aboutData.title}</h2>
                    <p className="description">{aboutData.description}</p>
                    <h3 className="section-title">Deneyimlerim</h3>
                    <ul className="experience-list">
                        {aboutData.experience.map((exp) => (
                            <li
                                key={exp.id}
                                className={`experience-item ${hoveredIndex === exp.id ? 'hovered' : ''}`}
                                onMouseEnter={() => setHoveredIndex(exp.id)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <h4>{exp.company}</h4>
                                <p>{exp.role}</p>
                                <p>{exp.duration}</p>
                            </li>
                        ))}
                    </ul>
                    <h3 className="section-title">Education</h3>
                    <ul className="education-list">
                        {aboutData.education.map((edu) => (
                            <li
                                key={edu.id}
                                className={`education-item ${hoveredIndex === edu.id ? 'hovered' : ''}`}
                                onMouseEnter={() => setHoveredIndex(edu.id)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <h4>{edu.institution}</h4>
                                <p>{edu.degree}</p>
                                <p>{edu.year}</p>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};