import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaMedium, FaDiscord, FaPaperPlane, FaInstagram, FaYoutube } from 'react-icons/fa';
import '../styles/Contact.css';
import contactData from '../data/contact.json';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // İkon haritası
  const iconMap: Record<string, React.ReactNode> = {
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    medium: <FaMedium />,
    youtube: <FaYoutube />,
    discord: <FaDiscord />
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });
    
    try {
      // E-posta gönderme işlemi burada gerçekleştirilecek
      // Örnek olarak, formData'yı kullanarak bir e-posta servisi entegrasyonu yapılabilir
      // Şimdilik sadece simüle ediyoruz
      
      // Simüle edilmiş bir gecikme
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Başarılı yanıt
      setFormStatus({
        type: 'success',
        message: contactData.contactText.formStatus.success
      });
      
      // Formu sıfırla
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: contactData.contactText.formStatus.error
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">{contactData.contactText.title}</h1>
        <p className="contact-subtitle">{contactData.contactText.subtitle}</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <h2 className="contact-info-title">{contactData.contactText.contactInfoTitle}</h2>
          
          <div className="contact-info-item">
            <div className="contact-info-icon">
              <FaEnvelope />
            </div>
            <div className="contact-info-text">
              <h3>E-posta</h3>
              <a href={`mailto:${contactData.contactInfo.email}`}>{contactData.contactInfo.email}</a>
            </div>
          </div>
          
          <div className="contact-info-item">
            <div className="contact-info-icon">
              <FaPhone />
            </div>
            <div className="contact-info-text">
              <h3>Telefon</h3>
              <p>{contactData.contactInfo.phone}</p>
            </div>
          </div>
          
          <div className="contact-info-item">
            <div className="contact-info-icon">
              <FaMapMarkerAlt />
            </div>
            <div className="contact-info-text">
              <h3>Konum</h3>
              <p>{contactData.contactInfo.location}</p>
            </div>
          </div>
          
          <h2 className="contact-info-title" style={{ marginTop: '2rem' }}>{contactData.contactText.socialMediaTitle}</h2>
          <div className="social-links">
            {contactData.socialMedia.map((social, index) => (
              <a 
                key={index}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link" 
                title={social.name}
              >
                {iconMap[social.icon]}
              </a>
            ))}
          </div>
        </div>
        
        <div className="contact-form">
          <h2 className="contact-info-title">{contactData.contactText.formTitle}</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">{contactData.contactText.formLabels.name}</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="form-control" 
                placeholder={contactData.contactText.formPlaceholders.name} 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">{contactData.contactText.formLabels.email}</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="form-control" 
                placeholder={contactData.contactText.formPlaceholders.email} 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject" className="form-label">{contactData.contactText.formLabels.subject}</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                className="form-control" 
                placeholder={contactData.contactText.formPlaceholders.subject} 
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">{contactData.contactText.formLabels.message}</label>
              <textarea 
                id="message" 
                name="message" 
                className="form-control" 
                placeholder={contactData.contactText.formPlaceholders.message} 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? contactData.contactText.formLabels.submitting : contactData.contactText.formLabels.submit} <FaPaperPlane />
            </button>
            
            {formStatus.type && (
              <div className={`form-status ${formStatus.type}`}>
                {formStatus.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
