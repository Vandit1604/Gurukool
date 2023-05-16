import { useContext, useState } from "react";
import axios from "axios";
import MessageContext from "../Context/Messages/MessageContext";
import AuthContext from "../Context/Auth/AuthContext";
function useApi() {
  const Message = useContext(MessageContext);
  const BaseUrl = "http://localhost:8080/api";
  const [Data, updateData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const axiosJWT = axios.create();
  const Auth = useContext(AuthContext);
  const getRefreshToken = async (config) => {
    await axios
      .post(BaseUrl + "/Token/", {
        Email: Auth.User.Email,
      })
      .then(
        (data) => {
          Auth.UpdateToken(data.data.AccessToken);
          config.headers.token = data.data.AccessToken;
          return config;
        },
        (error) => {
          Auth.LogOut();
          Message.Add_Message("Error", "Session Expired");
        }
      );
  };
  //
  axiosJWT.interceptors.request.use(
    async (config) => {
      try {
        await getRefreshToken(config);
        return config;
      } catch (error) {
        Message.Add_Message("Error", "Session Expired");
        Auth.LogOut();
        return Promise.reject(error);
      }
    },
    (error) => {
      Message.Add_Message("Error", "Session Expired");
      Auth.LogOut();
      Promise.reject(error);
    }
  );
  //
  const Request = async (
    target,
    method,
    data,
    ErrorMessage = "Something went wrong"
  ) => {
    Message.Remove_Message();
    setLoading(true);
    try {
      await axios(BaseUrl + target, {
        method: method,
        data: data,
      })
        .then((data) => {
          return data.data;
        })
        .then((data) => {
          if (data.Status === "Success") {
            updateData(data);
          } else {
            updateData([]);
            Message.Add_Message("Error", data.ErrorMessage);
          }
        })
        .catch((error) => Message.Add_Message("Error", ErrorMessage));
    } catch (error) {
      Message.Add_Message("Error", ErrorMessage);
    }
    setLoading(false);
  };
  const UserRequest = async (
    target,
    method,
    data,
    ErrorMessage = "Something went wrong"
  ) => {
    Message.Remove_Message();
    setLoading(true);
    try {
      await axiosJWT(BaseUrl + target, {
        method: method,
        data: data,
      })
        .then((data) => {
          return data.data;
        })
        .then((data) => {
          if (data.Status === "Success") {
            updateData(data);
          } else {
            updateData([]);
            Message.Add_Message("Error", "ErrorMessage");
          }
        })
        .catch((error) => {
          Message.Add_Message("Error", ErrorMessage);
        });
    } catch (error) {
      Message.Add_Message("Error", ErrorMessage);
    }
    setLoading(false);
  };
  return { UserRequest, Request, Data, Loading };
}

export default useApi;
