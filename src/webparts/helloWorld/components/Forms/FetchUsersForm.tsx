import * as React from "react";
import { FC } from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ProgressIndicator } from "office-ui-fabric-react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import style from "../HelloWorld.module.scss"

const FetchUsersForm: FC<any> = ({ pickedUser }) => {
    
  const [user, setUser] = useState<any>([]);

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

  interface IPickedUser {
    name?: string;
    username?: string;
    email?: string;
  }

  return (
    <div>
      <div>
        {user.length === 0 ? (
          <ProgressIndicator label="Loading" />
        ) : (
          <Formik
            initialValues={{
              name: "",
              username: "",
              email: "",
            }}
            onSubmit={(
              values: IPickedUser,
              { setSubmitting }: FormikHelpers<IPickedUser>
            ) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
          >
            <Form>
              <div className={style.container}>
                <div className={style.container__users}>
                  Вы выбрали пользователя:
                  {" " + user.name}
                </div>

                <div className={style.container__users}>
                  Телефон:
                  {" " + user.phone}
                </div>

                <div className={style.container__users}>
                  Логин пользователя:
                  {" " + user.username}
                </div>
              </div>
              <div className={style.container__form}>
                <label htmlFor="message">
                  Отправить пользователю сообщение
                </label>
                <Field id="message" name="message" placeholder="Cообщение" />

                <button type="submit">Отправить</button>
              </div>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );;
};

export default FetchUsersForm;
