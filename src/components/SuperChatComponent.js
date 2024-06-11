import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/SuperChatComponent.module.css";

const SuperChatComponent = ({ onSuperChat }) => {
  return (
    <div className={`container mt-4 ${styles.superChatContainer}`}>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <p>Super Chatを送るMomentのTIMESTAMP</p>
          <input type="text" className="form-control" placeholder="0:00:00" />
        </div>
        <div className="d-flex">
          <div className="form-check me-3">
            <input
              className="form-check-input"
              type="radio"
              name="superChat"
              id="superChat10"
              value="$10"
            />
            <label className="form-check-label" htmlFor="superChat10">
              $10
            </label>
          </div>
          <div className="form-check me-3">
            <input
              className="form-check-input"
              type="radio"
              name="superChat"
              id="superChat20"
              value="$20"
            />
            <label className="form-check-label" htmlFor="superChat20">
              $20
            </label>
          </div>
          <div className="form-check me-3">
            <input
              className="form-check-input"
              type="radio"
              name="superChat"
              id="superChat50"
              value="$50"
            />
            <label className="form-check-label" htmlFor="superChat50">
              $50
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="superChat"
              id="superChat100"
              value="$100"
            />
            <label className="form-check-label" htmlFor="superChat100">
              $100
            </label>
          </div>
        </div>
        <button className="btn btn-danger" onClick={onSuperChat}>
          Super Chat (ダミーです)
        </button>
      </div>
    </div>
  );
};

export default SuperChatComponent;
