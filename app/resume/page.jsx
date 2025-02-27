"use client";
import React, { useRef, useEffect } from "react";
import { Globe, Mail, Phone, MapPin } from "lucide-react";
import styles from "./cv.module.css";
import gsap from "gsap";
export default function CV() {
  const cvRef = useRef(null);
  const titleRef = useRef(null);
  const sectionRefs = useRef([]);
  useEffect(() => {
    // Permettre le défilement uniquement pour cette page
    if (cvRef.current) {
      const handleScroll = (e) => {
        e.stopPropagation();
      };

      cvRef.current.addEventListener("wheel", handleScroll);
      cvRef.current.addEventListener("touchmove", handleScroll);

      return () => {
        if (cvRef.current) {
          cvRef.current.removeEventListener("wheel", handleScroll);
          cvRef.current.removeEventListener("touchmove", handleScroll);
        }
      };
    }
  }, []);
  useEffect(() => {
    gsap.from(titleRef.current, {
      opacity: 0,
      y: -20,
      duration: 1,
      ease: "power3.out",
    });
    sectionRefs.current.forEach((section, index) => {
      gsap.from(section, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: index * 0.3,
        ease: "power3.out",
      });
    });
  }, []);
  return (
    <div ref={cvRef} className={styles.cvContainer}>
      <div className={styles.cvContent}>
        {/* En-tête */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.name}>Alexis GERMAIN, Développeur Web.</h1>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.contactItem}>
              <span>alexis-germain.fr</span>
              <Globe className="w-4 h-4" />
            </div>
            <div className={styles.contactItem}>
              <span>contact@alexis-germain.fr</span>
              <Mail className="w-4 h-4" />
            </div>
            <div className={styles.contactItem}>
              <span>06.08.53.52.80</span>
              <Phone className="w-4 h-4" />
            </div>
            <div className={styles.contactItem}>
              <span>Bruyères-sur-Oise, 95820</span>{" "}
              <MapPin className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Section Expérience */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>

          {/* Auto-Entreprise */}
          <div className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
              <h3 className={styles.jobTitle}>
                Auto-Entreprise{" "}
                <span className={styles.jobRole}>
                  • Développeur Web Freelance
                </span>
              </h3>
            </div>
            <div className={styles.periodRow}>
              <span className={styles.period}>
                2019 - 2022 | 2022 - Aujourd'hui
              </span>
            </div>
            <ul className={styles.experienceList}>
              <li>Conception et développement de sites vitrines.</li>
              <li>Maintenance et optimisation de sites existants.</li>
              <li>
                Intégration de solutions personnalisées pour répondre à des
                besoins spécifiques.
              </li>
              <li>
                Support technique et formation pour garantir l'autonomie des
                clients.
              </li>
            </ul>
          </div>

          {/* ASUS France */}
          <div className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
              <h3 className={styles.jobTitle}>
                ASUS France <span className={styles.jobRole}>• Webmaster</span>
              </h3>
            </div>
            <div className={styles.periodRow}>
              <span className={styles.period}>Mai 2022 - Août 2022</span>
            </div>
            <ul className={styles.experienceList}>
              <li>
                Conception, développement, gestion et maintenance des sites web
                français.
              </li>
              <li>
                Collaboration internationale : coordination avec ASUS Europe et
                application des correctifs techniques via Jira, en lien avec
                Taiwan.
              </li>
              <li>
                Support et traduction : adaptation des contenus marketing en
                français et assistance technique pour les campagnes européennes.
              </li>
              <li>
                Participation aux réunions marketing : contribution aux
                stratégies digitales et intégration des initiatives marketing
                sur les plateformes web.
              </li>
            </ul>
          </div>

          {/* MGS Informatique */}
          <div className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
              <h3 className={styles.jobTitle}>
                MGS Informatique{" "}
                <span className={styles.jobRole}>• Développeur Web Junior</span>
              </h3>
            </div>
            <div className={styles.periodRow}>
              <span className={styles.period}>
                Septembre 2018 - Février 2019
              </span>
            </div>
            <ul className={styles.experienceList}>
              <li>
                Conception, développement, gestion et maintenance des sites web.
              </li>
              <li>Formation de l'équipe sur HTML, CSS et WordPress.</li>
              <li>
                Consultation et analyse des besoins de l'entreprise cliente.
              </li>
            </ul>
          </div>
        </section>

        {/* Section Education */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>

          <div className={styles.educationItem}>
            <div className={styles.experienceHeader}>
              <h3 className={styles.jobTitle}>
                IFOCOP{" "}
                <span className={styles.jobRole}>
                  • Formation développeur intégrateur Web
                </span>
              </h3>
            </div>
            <div className={styles.periodRow}>
              <span className={styles.period}>
                Septembre 2018 - Février 2019
              </span>
            </div>
            <ul className={styles.experienceList}>
              <li>HTML 5 / CSS 3 / JavaScript ES6</li>
              <li>CMS Wordpress / Drupal</li>
              <li>Intégration et gestion MySQL BDD</li>
            </ul>
          </div>
        </section>

        {/* Section Compétences */}
        <div className={styles.skillsContainer}>
          {/* Soft Skills & Skills */}
          <section className={styles.skillsSection}>
            <h2 className={styles.sectionTitle}>Soft Skills & Skills</h2>

            <div className={styles.softSkills}>
              <p>Empathique, Autonome, Coopératif, Créatif.</p>
              <p>
                Idéation, Brainstorming, Design, Maquettage, Prototypage,
                Conception, Développement, Optimisation, Support technique.
              </p>
            </div>
          </section>

          {/* Tools */}
          <section className={styles.toolsSection}>
            <h2 className={styles.sectionTitle}>Tools</h2>

            <div className={styles.toolItem}>
              <span className={styles.toolCategory}>My Framework </span>
              <span className={styles.toolList}>
                • Vue/Nuxt3, React/Next, AngularJs
              </span>
            </div>

            <div className={styles.toolItem}>
              <span className={styles.toolCategory}>Data </span>
              <span className={styles.toolList}>• SQL, GraphQL</span>
            </div>

            <div className={styles.toolItem}>
              <span className={styles.toolCategory}>Back-end </span>
              <span className={styles.toolList}>• Node.Js, Express</span>
            </div>

            <div className={styles.toolItem}>
              <span className={styles.toolCategory}>Design </span>
              <span className={styles.toolList}>• Figma, PhotoShop</span>
            </div>

            <div className={styles.toolItem}>
              <span className={styles.toolCategory}>Management </span>
              <span className={styles.toolList}>• JIRA, Trello</span>
            </div>

            <div className={styles.toolItem}>
              <span className={styles.toolCategory}>Animation </span>
              <span className={styles.toolList}>• GSAP, Motion</span>
            </div>

            <div className={styles.toolItem}>
              <span className={styles.toolCategory}>WebGL </span>
              <span className={styles.toolList}>• Three, Tres, Fiber</span>
            </div>

            <div className={styles.toolItem}>
              <span className={styles.toolCategory}>CMS </span>
              <span className={styles.toolList}>• Strapi</span>
            </div>

            <div className={styles.toolItem}>
              <span className={styles.toolCategory}>3D </span>
              <span className={styles.toolList}>• Blender</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
