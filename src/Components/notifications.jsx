import "./notifications.css";
import useUserStore from "../stateManagement/userInfoStore";
import { useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const { userID } = useUserStore();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `https://codd.cs.gsu.edu/~zbronola1/SoftwareEngineering/shart/getNotifications.php?userID=${userID}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error); // Handle the error returned from PHP
        }
        setNotifications(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, [userID]);

  return (
    <div className="notiComponent">
      <h2>Notifications</h2>
      {notifications.map((notification, index) => (
        <div key={index} className="notiContainer">
          <div className="left">
            <div className="notiImg">
              <img src={notification.artImgLink} alt="tmb" />
            </div>
            <p className="notiMsg">{notification.likerName} liked your post</p>
          </div>

          <p className="notiTime">{notification.likedAt}</p>
        </div>
      ))}
    </div>
  );
};
export default Notifications;
