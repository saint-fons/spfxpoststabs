import * as React from "react";
import { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const FetchUsersForm: FC<any> = ({ pickedUser }) => {
  const [user, setUser] = useState<any[]>([]);

  /* Обращение за пользователем */
  async function fetchPosts(pickedUser) {
    try {
      const response = await axios.get<any>(
        `https://jsonplaceholder.typicode.com/users/${pickedUser}`
      );
      setUser(response.data);
    } catch (e) {
      alert(e);
    }
  }

  /* Получаем нового пользователя после выбора */
  useEffect(() => {
    /* Пропускаем первый вызов */
    if (Number(pickedUser) === 0) {
    } else {
      fetchPosts(pickedUser);
    }
  }, [pickedUser]);

  return <div>hi</div>;
};

export default FetchUsersForm;
