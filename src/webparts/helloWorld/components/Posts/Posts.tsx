import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { WidgetSize, Dashboard } from "@pnp/spfx-controls-react/lib/Dashboard";
import { useId, useBoolean } from "@fluentui/react-hooks";
import axios from "axios";
import { Icon, Text, DetailsList } from "office-ui-fabric-react";
import columns from "../../styles/columns"

const Posts = () => {
  /* Посты */
  const [posts, setPosts] = useState<any>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get<any>(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    } catch (e) {
      alert(e);
    }
  }
  /* Посты */

  const [dividedBy3, setdividedBy3] = useState<any>(0);
  const [dividedBy7, setdividedBy7] = useState<any>(0);
  const [allNumbers, setallNumbers] = useState<any>(0);

  useEffect(() => {
    let dividedBy3 = 0;
    let dividedBy7 = 0;
    let allNumbers = 0;

    for (let i = 0; i <= posts.length; i++) {
      if (i % 3 === 0) {
        dividedBy3 = dividedBy3 + 1;
      }
      if (i % 7 === 0) {
        dividedBy7 = dividedBy7 + 1;
      }
      if (i % 7 !== 0 && i % 3) {
        allNumbers = allNumbers + 1;
      }
    }

    /* Сет даты диаграммы */
    setdividedBy3(dividedBy3);
    setdividedBy7(dividedBy7);
    setallNumbers(allNumbers);
  }, [posts]);

  /* Пагинация */

  const postsPerPage = 10;

  const pageCount = Math.ceil(posts.length / postsPerPage);

  const [pageNumber, setPageNumber] = useState<any>(0);

  const pagesVisited = pageNumber * postsPerPage;

  const displayPosts = posts.slice(pagesVisited, pagesVisited + postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  /* Пагинация */

  /* Сет выбранного пользователя */
  const [pickedUser, setPickedUser] = useState<any[]>([]);

  const PickedUser = (user: any): void => {
    setPickedUser(user.userId.toString());
  };

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const labelId: string = useId("dialogLabel");
  const subTextId: string = useId("subTextLabel");

  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
    }),
    [labelId, subTextId]
  );

  /* *************** Второй таб ***********************/

  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const DATA = [
    { x0: 0, x: 1, y: dividedBy3 },
    { x0: 1, x: 2, y: dividedBy7 },
    { x0: 2, x: 3, y: allNumbers },
  ];

  const linkExample = { href: "#" };
  const calloutItemsExample = [
    {
      id: "action_1",
      title: "Info",
      icon: <Icon iconName={"Edit"} />,
    },
    { id: "action_2", title: "Popup", icon: <Icon iconName={"Add"} /> },
  ];

  return (
    <div>
      <Dashboard
        widgets={[
          {
            title: "SPFx",
            widgetActionGroup: calloutItemsExample,
            size: WidgetSize.Triple,
            body: [
              {
                id: "t1",
                title: "Посты",
                content: (
                  <Text>
                    <DetailsList
                      items={displayPosts}
                      columns={columns}
                      selectionPreservedOnEmptyClick={true}
                      ariaLabelForSelectionColumn="Toggle selection"
                      ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                      checkButtonAriaLabel="select row"
                      onItemInvoked={PickedUser}
                    />
                  </Text>
                ),
              },
              {
                id: "t2",
                title: "Графики",
                content: <Text>Content #2</Text>,
              },
              {
                id: "t3",
                title: "Tab 3",
                content: <Text>Content #3</Text>,
              },
            ],
            link: linkExample,
          },
        ]}
      />
    </div>
  );
};

export default Posts;
