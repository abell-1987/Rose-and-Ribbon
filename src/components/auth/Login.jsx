import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsersByEmail, getPartiesByUserId } from "../../services/userService";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const matches = await getUsersByEmail(email.trim());
    const user = matches?.[0];

    if (!user) {
      window.alert("No customer found with that email.");
      return;
    }

    localStorage.setItem("roseribbon_user", JSON.stringify({ id: user.id }));

    const parties = await getPartiesByUserId(user.id);

    if (parties.length > 1) {
      navigate("/party-picker");
    } else if (parties.length === 1) {
      navigate(`/party/${parties[0].id}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="loginPage">
      <h1 className="pageTitle">Login to view party details:</h1>

      <form onSubmit={handleLogin} className="regencyCard loginCard">
        <div className="loginFormStack">
          <input
            className="loginInput"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="loginButton" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
