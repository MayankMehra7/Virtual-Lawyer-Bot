import styles from "./home-page.module.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homePage}>
      <img className={styles.homePageChild} alt="fill" src="/frame-17@2x.png" />
      <div className={styles.frame}>
        <div className={styles.frameParent}>
          <div className={styles.virtualLawyerWrapper}>
            <b className={styles.virtualLawyer}>Virtual Lawyer</b>
          </div>
          <img
            className={styles.aiTechnologySparkLightbulbIcon}
            alt=""
            src="/aitechnologysparklightbulbideabrightlightingartificialintelligenceai1.svg"
          />
        </div>
      </div>
      {/* <div className={styles.frame1}>
        <div className={styles.guidelineParent}>
          <b className={styles.guideline}>{`Guideline `}</b>
          <b className={styles.faq}>FAQ</b>
          <b className={styles.contactUs}>Contact Us</b>
          <b className={styles.discord}>Discord</b>
          <b className={styles.twitter}>Twitter</b>
        </div>
      </div> */}
      <div className={styles.frame2}>
        <div className={styles.virtualLawyerParent}>
          <div className={styles.virtualLawyer1}>VIRTUAL LAWYER</div>
          <div className={styles.virtualLawyer2}>VIRTUAL LAWYER</div>
          <div className={styles.virtualLawyer3}>VIRTUAL LAWYER</div>
          <div className={styles.virtualLawyer4}>VIRTUAL LAWYER</div>
        </div>
      </div>
      <img className={styles.homePageItem} alt="" src="/frame-16.svg" />
      <div className={styles.frame3}>
        <img className={styles.frameChild} alt="" src="/frame-18@2x.png" />
      </div>
      <div className={styles.frame4}>
        <div className={styles.theVirtualLawyerProjectDParent}>
          <div className={styles.theVirtualLawyerContainer}>
            <p className={styles.theVirtualLawyer}>
              The "Virtual Lawyer" project develops an AI legal chatbot using
              AILA/Indian Penal Code datasets, Python, LLMs, and
              RAG models.
            </p>
            <p className={styles.theVirtualLawyer}>
              {" "}
              It features a React/Angular web interface, ensuring intuitive use
              and legal compliance, refined through rigorous testing.
            </p>
          </div>
          <div className={styles.image13Parent}>
            <img className={styles.image13Icon} alt="" src="/image-13@2x.png" />
            <img className={styles.image14Icon} alt="" src="/image-14@2x.png" />
          </div>
          <img className={styles.frameItem} alt="" src="/frame-14@2x.png" />
        </div>
      </div>
      <div className={styles.frame5}>
        <div className={styles.getStartedWrapper}>
          <div
            className={styles.getStarted}
            onClick={() => navigate("/chatbot")}
          >
            Get Started
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
