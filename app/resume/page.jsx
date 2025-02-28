"use client";
import React, { useRef, useEffect } from "react";
import { Globe, Mail, Phone, MapPin } from "lucide-react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

export default function CV() {
  const cvRef = useRef(null);
  gsap.registerPlugin(TextPlugin);

  useEffect(() => {
    if (cvRef.current) {
      const handleScroll = (e) => e.stopPropagation();
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
    const tl = gsap.timeline();


    tl.from("#title", {
      y: -20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.from("#contact1", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.from("#contact2", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.from("#contact3", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.from("#contact4", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.from("#experienceTitle", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.from("#job1", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.from("#period1", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.to("#exp1Item1", {
      duration: 0.5,
      opacity: 1,
      text: "Conception et développement de sites vitrines.",
      ease: "none",
    });
    tl.to("#exp1Item2", {
      duration: 0.5,
      opacity: 1,
      text: "Maintenance et optimisation de sites existants.",
      ease: "none",
    });
    tl.to("#exp1Item3", {
      duration: 0.5,
      opacity: 1,
      text: "Intégration de solutions personnalisées pour répondre à des besoins spécifiques.",
      ease: "none",
    });
    tl.to("#exp1Item4", {
      duration: 0.5,
      opacity: 1,
      text: "Support technique et formation pour garantir l'autonomie des clients.",
      ease: "none",
    });

 
    tl.from("#job2", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.from("#period2", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.to("#exp2Item1", {
      duration: 0.5,
      opacity: 1,
      text: "Conception, développement, gestion et maintenance des sites web français.",
      ease: "none",
    });
    tl.to("#exp2Item2", {
      duration: 0.5,
      opacity: 1,
      text: "Collaboration internationale : coordination avec ASUS Europe et application des correctifs via Jira, en lien avec Taiwan.",
      ease: "none",
    });
    tl.to("#exp2Item3", {
      duration: 0.5,
      opacity: 1,
      text: "Support et traduction : adaptation des contenus marketing et assistance technique pour les campagnes européennes.",
      ease: "none",
    });
    tl.to("#exp2Item4", {
      duration: 0.5,
      opacity: 1,
      text: "Participation aux réunions marketing : contribution aux stratégies digitales et intégration des initiatives sur les plateformes web.",
      ease: "none",
    });

    tl.from("#job3", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.from("#period3", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.to("#exp3Item1", {
      duration: 0.5,
      opacity: 1,
      text: "Conception, développement, gestion et maintenance des sites web.",
      ease: "none",
    });
    tl.to("#exp3Item2", {
      duration: 0.5,
      opacity: 1,
      text: "Formation de l'équipe sur HTML, CSS et WordPress.",
      ease: "none",
    });
    tl.to("#exp3Item3", {
      duration: 0.5,
      opacity: 1,
      text: "Consultation et analyse des besoins de l'entreprise cliente.",
      ease: "none",
    });

    tl.from("#educationTitle", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.from("#job4", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.from("#period4", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.to("#eduItem1", {
      duration: 0.5,
      opacity: 1,
      text: "HTML 5 / CSS 3 / JavaScript ES6",
      ease: "none",
    });
    tl.to("#eduItem2", {
      duration: 0.5,
      opacity: 1,
      text: "CMS Wordpress / Drupal",
      ease: "none",
    });
    tl.to("#eduItem3", {
      duration: 0.5,
      opacity: 1,
      text: "Intégration et gestion MySQL BDD",
      ease: "none",
    });

    tl.from("#skillsTitle", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.to("#softSkill1", {
      duration: 0.5,
      opacity: 1,
      text: "Empathique, Autonome, Coopératif, Créatif.",
      ease: "none",
    });
    tl.to("#softSkill2", {
      duration: 0.5,
      opacity: 1,
      text: "Idéation, Brainstorming, Design, Maquettage, Prototypage, Conception, Développement, Optimisation, Support technique.",
      ease: "none",
    });

    tl.from("#toolsTitle", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });
    tl.to("#tool1", {
      duration: 0.5,
      opacity: 1,
      text: "My Framework • Vue/Nuxt3, React/Next, AngularJs",
      ease: "none",
    });
    tl.to("#tool2", {
      duration: 0.5,
      opacity: 1,
      text: "Data • SQL, GraphQL",
      ease: "none",
    });
    tl.to("#tool3", {
      duration: 0.5,
      opacity: 1,
      text: "Back-end • Node.Js, Express",
      ease: "none",
    });
    tl.to("#tool4", {
      duration: 0.5,
      opacity: 1,
      text: "Design • Figma, PhotoShop",
      ease: "none",
    });
    tl.to("#tool5", {
      duration: 0.5,
      opacity: 1,
      text: "Management • JIRA, Trello",
      ease: "none",
    });
    tl.to("#tool6", {
      duration: 0.5,
      opacity: 1,
      text: "Animation • GSAP, Motion",
      ease: "none",
    });
    tl.to("#tool7", {
      duration: 0.5,
      opacity: 1,
      text: "WebGL • Three, Tres, Fiber",
      ease: "none",
    });
    tl.to("#tool8", {
      duration: 0.5,
      opacity: 1,
      text: "CMS • Strapi",
      ease: "none",
    });
    tl.to("#tool9", {
      duration: 0.5,
      opacity: 1,
      text: "3D • Blender",
      ease: "none",
    });
  }, []);

  return (
    <div ref={cvRef} className="cvContainer">
      <div className="cvContent">
        {/* HEADER */}
        <header className="header">
          <div className="headerLeft">
            <h1 id="title" className="name">
              Alexis GERMAIN, Développeur Web.
            </h1>
          </div>
          <div className="headerRight">
            <div id="contact1" className="contactItem">
              <span>alexis-germain.fr</span>
              <Globe className="w-4 h-4" />
            </div>
            <div id="contact2" className="contactItem">
              <span>contact@alexis-germain.fr</span>
              <Mail className="w-4 h-4" />
            </div>
            <div id="contact3" className="contactItem">
              <span>06.08.53.52.80</span>
              <Phone className="w-4 h-4" />
            </div>
            <div id="contact4" className="contactItem">
              <span>Bruyères-sur-Oise, 95820</span>
              <MapPin className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* EXPERIENCE SECTION */}
        <section className="section">
          <h2 id="experienceTitle" className="sectionTitle">
            Experience
          </h2>
          {/* Auto-Entreprise */}
          <div className="experienceItem">
            <div className="experienceHeader">
              <h3 id="job1" className="jobTitle">
                Auto-Entreprise{" "}
                <span id="jobRole1" className="jobRole">
                  • Développeur Web Freelance
                </span>
              </h3>
            </div>
            <div className="periodRow">
              <span id="period1" className="period">
                2019 - 2022 | 2022 - Aujourd'hui
              </span>
            </div>
            <ul className="experienceList">
              <li id="exp1Item1" style={{ opacity: 0 }}>
                {" "}
              </li>
              <li id="exp1Item2" style={{ opacity: 0 }}>
                {" "}
              </li>
              <li id="exp1Item3" style={{ opacity: 0 }}>
                {" "}
              </li>
              <li id="exp1Item4" style={{ opacity: 0 }}>
                {" "}
              </li>
            </ul>
          </div>

          {/* ASUS France */}
          <div className="experienceItem">
            <div className="experienceHeader">
              <h3 id="job2" className="jobTitle">
                ASUS France{" "}
                <span id="jobRole2" className="jobRole">
                  • Webmaster
                </span>
              </h3>
            </div>
            <div className="periodRow">
              <span id="period2" className="period">
                Mai 2022 - Août 2022
              </span>
            </div>
            <ul className="experienceList">
              <li id="exp2Item1" style={{ opacity: 0 }}>
                {" "}
              </li>
              <li id="exp2Item2" style={{ opacity: 0 }}>
                {" "}
              </li>
              <li id="exp2Item3" style={{ opacity: 0 }}>
                {" "}
              </li>
              <li id="exp2Item4" style={{ opacity: 0 }}>
                {" "}
              </li>
            </ul>
          </div>

          {/* MGS Informatique */}
          <div className="experienceItem">
            <div className="experienceHeader">
              <h3 id="job3" className="jobTitle">
                MGS Informatique{" "}
                <span id="jobRole3" className="jobRole">
                  • Développeur Web Junior
                </span>
              </h3>
            </div>
            <div className="periodRow">
              <span id="period3" className="period">
                Septembre 2018 - Février 2019
              </span>
            </div>
            <ul className="experienceList">
              <li id="exp3Item1" style={{ opacity: 0 }}>
                {" "}
              </li>
              <li id="exp3Item2" style={{ opacity: 0 }}>
                {" "}
              </li>
              <li id="exp3Item3" style={{ opacity: 0 }}>
                {" "}
              </li>
            </ul>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section className="section">
          <h2 id="educationTitle" className="sectionTitle">
            Education
          </h2>
          <div className="educationItem">
            <div className="experienceHeader">
              <h3 id="job4" className="jobTitle">
                IFOCOP{" "}
                <span id="jobRole4" className="jobRole">
                  • Formation développeur intégrateur Web
                </span>
              </h3>
            </div>
            <div className="periodRow">
              <span id="period4" className="period">
                Septembre 2018 - Février 2019
              </span>
            </div>
            <ul className="experienceList">
              <li id="eduItem1" style={{ opacity: 0 }}>
                {" "}
              </li>
              <li id="eduItem2" style={{ opacity: 0 }}>
                {" "}
              </li>
              <li id="eduItem3" style={{ opacity: 0 }}>
                {" "}
              </li>
            </ul>
          </div>
        </section>

        {/* SKILLS & TOOLS */}
        <div className="skillsContainer">
          {/* SKILLS */}
          <section className="skillsSection">
            <h2 id="skillsTitle" className="sectionTitle">
              Soft Skills & Skills
            </h2>
            <div className="softSkills">
              <p id="softSkill1" style={{ opacity: 0 }}>
                {" "}
              </p>
              <p id="softSkill2" style={{ opacity: 0 }}>
                {" "}
              </p>
            </div>
          </section>
          {/* TOOLS */}
          <section className="toolsSection">
            <h2 id="toolsTitle" className="sectionTitle" style={{ opacity: 0 }}>
              Tools
            </h2>
            <div className="toolItem">
              <span className="toolCategory">My Framework </span>
              <span id="tool1" className="toolList" style={{ opacity: 0 }}>
                {" "}
              </span>
            </div>
            <div className="toolItem">
              <span className="toolCategory">Data </span>
              <span id="tool2" className="toolList" style={{ opacity: 0 }}>
                {" "}
              </span>
            </div>
            <div className="toolItem">
              <span className="toolCategory">Back-end </span>
              <span id="tool3" className="toolList" style={{ opacity: 0 }}>
                {" "}
              </span>
            </div>
            <div className="toolItem">
              <span className="toolCategory">Design </span>
              <span id="tool4" className="toolList" style={{ opacity: 0 }}>
                {" "}
              </span>
            </div>
            <div className="toolItem">
              <span className="toolCategory">Management </span>
              <span id="tool5" className="toolList" style={{ opacity: 0 }}>
                {" "}
              </span>
            </div>
            <div className="toolItem">
              <span className="toolCategory">Animation </span>
              <span id="tool6" className="toolList" style={{ opacity: 0 }}>
                {" "}
              </span>
            </div>
            <div className="toolItem">
              <span className="toolCategory">WebGL </span>
              <span id="tool7" className="toolList" style={{ opacity: 0 }}>
                {" "}
              </span>
            </div>
            <div className="toolItem">
              <span className="toolCategory">CMS </span>
              <span id="tool8" className="toolList" style={{ opacity: 0 }}>
                {" "}
              </span>
            </div>
            <div className="toolItem">
              <span className="toolCategory">3D </span>
              <span id="tool9" className="toolList" style={{ opacity: 0 }}>
                {" "}
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
