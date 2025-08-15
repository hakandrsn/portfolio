import '../styles/About.css';
import { FaCode, FaLaptopCode, FaGraduationCap, FaBookReader } from 'react-icons/fa';

function About() {
  
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">Hakkımda</h1>
        <p className="about-subtitle">
          Yazılım geliştirme yolculuğum ve tutkularım hakkında daha fazla bilgi edinin.
        </p>
      </div>
      
      <div className="about-content">
        <div className="about-section">
          <h2><FaCode /> Yetenekler ve Uzmanlık</h2>
          <p>
            Frontend geliştirme konusunda uzmanlaşmış bir yazılım mühendisiyim. React, TypeScript ve modern web teknolojileri konusunda derin bilgi ve deneyime sahibim. Kullanıcı deneyimini ön planda tutan, performanslı ve ölçeklenebilir web uygulamaları geliştirmeyi seviyorum.
          </p>
          <p>
            Mobil uygulama geliştirme alanında da React Native ile çalışıyorum. Hem Android hem de iOS platformları için kullanıcı dostu ve yüksek performanslı uygulamalar geliştirebiliyorum.
          </p>
          <p>
            Backend tarafında ise Node.js, Express ve NestJS ile RESTful API'ler ve mikroservisler geliştiriyorum. Veritabanı yönetimi, kimlik doğrulama ve güvenlik konularında da deneyimim bulunmaktadır.
          </p>
        </div>
        
        <div className="about-section">
          <h2><FaLaptopCode /> Çalışma Yaklaşımım</h2>
          <p>
            Yazılım geliştirme sürecinde temiz kod yazmayı, test edilebilir ve bakımı kolay çözümler üretmeyi önemsiyorum. Agile metodolojileri benimseyerek, sürekli geri bildirim ve iyileştirme odaklı çalışıyorum.
          </p>
          <p>
            Takım çalışmasına ve açık iletişime değer veriyorum. Bir projenin başarısının sadece teknik yetkinlikle değil, aynı zamanda etkili işbirliği ve iletişimle de mümkün olduğuna inanıyorum.
          </p>
          <p>
            Sürekli öğrenme ve kendimi geliştirme konusunda tutkulu olduğum için, yeni teknolojileri ve yaklaşımları takip ediyor, düzenli olarak eğitimler alıyor ve kişisel projeler geliştiriyorum.
          </p>
        </div>
        
        <div className="about-section">
          <h2><FaGraduationCap /> Eğitim ve Gelişim</h2>
          <p>
            Bilgisayar Mühendisliği bölümünden mezun olduktan sonra, yazılım geliştirme alanında kendimi sürekli geliştirmeye devam ettim. Çeşitli sertifika programları ve online kurslar aracılığıyla bilgilerimi güncel tutuyorum.
          </p>
          <p>
            Teknoloji konferanslarına katılmayı, teknik makaleler okumayı ve açık kaynak projelere katkıda bulunmayı seviyorum. Bu sayede hem sektördeki gelişmeleri takip ediyor hem de topluluğa katkı sağlıyorum.
          </p>
        </div>
        
        <div className="about-section">
          <h2><FaBookReader /> Kişisel İlgi Alanları</h2>
          <p>
            Yazılım geliştirme dışında, fotoğrafçılık ve doğa yürüyüşü gibi hobilerim var. Bu aktiviteler, zihnimin tazelenmesine ve yaratıcılığımın gelişmesine yardımcı oluyor.
          </p>
          <p>
            Ayrıca, teknoloji ve bilim kurgu kitapları okumayı, yeni yerler keşfetmeyi ve farklı kültürleri tanımayı seviyorum. Bu deneyimler, bakış açımı genişletiyor ve problem çözme yaklaşımımı zenginleştiriyor.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
