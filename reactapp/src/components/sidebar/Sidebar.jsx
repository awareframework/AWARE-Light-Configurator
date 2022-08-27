import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";

const sidebarNavItems = [
  {
    display: "Study Information",
    icon: <i className="bx bx-home" />,
    to: "/study/study_information",
    section: "study_information",
  },
  {
    display: "Questions",
    icon: <i className="bx bx-star" />,
    to: "/study/questions",
    section: "questions",
  },
  {
    display: "Schedule configuration",
    icon: <i className="bx bx-calendar" />,
    to: "/study/schedule_configuration",
    section: "schedule_configuration",
  },
  {
    display: "Sensor data",
    icon: <i className="bx bx-user" />,
    to: "/study/sensor_data",
    section: "sensor_data",
  },
  {
    display: "Overview",
    icon: <i className="bx bx-receipt" />,
    to: "/study/overview",
    section: "overview",
  },
];

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const sidebarItem = sidebarRef.current.querySelector(
        ".sidebar__menu__item"
      );
      indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
      setStepHeight(sidebarItem.clientHeight);
    }, 50);
  }, []);

  // change active index
  useEffect(() => {
    const parts = window.location.pathname.split("/");
    let curPath = "study_information";
    if (parts.length === 3) [, , curPath] = parts;
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">New study</div>
      <div ref={sidebarRef} className="sidebar__menu">
        <div
          ref={indicatorRef}
          className="sidebar__menu__indicator"
          style={{
            transform: `translateX(-50%) translateY(${
              activeIndex * stepHeight
            }px)`,
          }}
        />
        {sidebarNavItems.map((item, index) => {
          return (
            <Link to={item.to} key={index}>
              <div
                className={`sidebar__menu__item ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <div className="sidebar__menu__item__icon">{item.icon}</div>
                <div className="sidebar__menu__item__text">{item.display}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
