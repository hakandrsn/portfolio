import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaGithub, FaLinkedin, FaTwitter, FaUser, FaCode, FaBriefcase, FaGraduationCap, FaCertificate, FaLanguage, FaHeart } from 'react-icons/fa';
import '../styles/Profile.css';
import profileAvatar from '../assets/images/profile-avatar.svg';
import type { ProfileData } from '../types/profile';
import { useProfile } from '../hooks/useFirebaseData';

function Profile() {
  const { data: profileData, isLoading: loading, error } = useProfile();

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <FaGithub />;
      case 'linkedin':
        return <FaLinkedin />;
      case 'twitter':
        return <FaTwitter />;
      default:
        return <FaGlobe />;
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-banner"></div>
        <div className="profile-content-wrapper">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Profil yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="profile-banner"></div>
        <div className="profile-content-wrapper">
          <div className="error-message">
            <h2>Hata!</h2>
            <p>{error instanceof Error ? error.message : 'Profil verisi yüklenirken bir hata oluştu'}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-banner"></div>
      <div className="profile-content-wrapper">
        <div className="profile-header">
          <div className="profile-avatar-container">
            <img 
              src={profileAvatar} 
              alt={profileData.name} 
              className="profile-avatar" 
            />
          </div>
          <h1 className="profile-name">{profileData.name}</h1>
          <h2 className="profile-title">{profileData.title}</h2>
          <p className="profile-bio">{profileData.bio}</p>
          
          <div className="profile-contact">
            <div className="contact-item">
              <FaEnvelope />
              <span>{profileData.contact.email}</span>
            </div>
            <div className="contact-item">
              <FaPhone />
              <span>{profileData.contact.phone}</span>
            </div>
            <div className="contact-item">
              <FaMapMarkerAlt />
              <span>{profileData.contact.location}</span>
            </div>
            <div className="contact-item">
              <FaGlobe />
              <span>{profileData.contact.website}</span>
            </div>
          </div>
          
          <div className="profile-social">
            {profileData.social.map((item, index) => (
              <a 
                key={index} 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                title={item.name}
              >
                {getSocialIcon(item.icon)}
              </a>
            ))}
          </div>
        </div>
        
        <div className="profile-content">
          <div className="profile-section-container">
            <div className="profile-left-column">
              <div className="profile-section">
                <h2 className="section-title"><FaCode className="section-icon" /> Beceriler</h2>
                <div className="skills-list">
                  {profileData.skills.map((skillGroup, index) => (
                    <div key={index} className="skill-group">
                      <h4 className="skill-category">{skillGroup.category}</h4>
                      <div className="skill-items">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <span key={skillIndex} className="skill-tag">{skill}</span>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Diller */}
            <div className="profile-section">
              <h3 className="section-title"><FaLanguage className="section-icon" /> Diller</h3>
              <div className="languages-list">
                {profileData.languages.map((language, index) => (
                  <div key={index} className="language-item">
                    <span className="language-name">{language.name}</span>
                    <span className="language-level">{language.level}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* İlgi Alanları */}
            <div className="profile-section">
              <h3 className="section-title"><FaHeart className="section-icon" /> İlgi Alanları</h3>
              <div className="interests-list">
                {profileData.interests.map((interest, index) => (
                  <span key={index} className="interest-item">{interest}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="profile-main">
            {/* Deneyim */}
            <div className="profile-section">
              <h3 className="section-title"><FaBriefcase className="section-icon" /> Deneyim</h3>
              <div className="experience-list">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <h4 className="experience-company"><FaUser className="item-icon" /> {exp.company}</h4>
                    <p className="experience-position"><FaBriefcase className="item-icon" /> {exp.position}</p>
                    <p className="experience-period"><FaGlobe className="item-icon" /> {exp.period}</p>
                    <p className="experience-description">{exp.description}</p>
                    <div className="experience-technologies">
                      {exp.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="skill-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Eğitim */}
            <div className="profile-section">
              <h3 className="section-title"><FaGraduationCap className="section-icon" /> Eğitim</h3>
              <div className="education-list">
                {profileData.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h4 className="education-institution"><FaGraduationCap className="item-icon" /> {edu.institution}</h4>
                    <p className="education-degree"><FaCode className="item-icon" /> {edu.degree}</p>
                    <p className="education-period"><FaGlobe className="item-icon" /> {edu.period}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sertifikalar */}
            <div className="profile-section">
              <h3 className="section-title"><FaCertificate className="section-icon" /> Sertifikalar</h3>
              <div className="certification-list">
                {profileData.certifications.map((cert, index) => (
                  <div key={index} className="certification-item">
                    <h4 className="certification-name"><FaCertificate className="item-icon" /> {cert.name}</h4>
                    <p className="certification-issuer"><FaUser className="item-icon" /> {cert.issuer}</p>
                    <p className="certification-date"><FaGlobe className="item-icon" /> {cert.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
