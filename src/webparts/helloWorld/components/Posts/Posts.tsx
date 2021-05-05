import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { WidgetSize, Dashboard } from "@pnp/spfx-controls-react/lib/Dashboard";
import { useId, useBoolean } from "@fluentui/react-hooks";
import axios from "axios";
import {
  Icon,
  Text,
  DetailsList,
  ProgressIndicator,
  DefaultButton,
  Dialog,
} from "office-ui-fabric-react";
import columns from "../../styles/columns";
import {
  ChartControl,
  ChartType,
} from "@pnp/spfx-controls-react/lib/ChartControl";
import ReactPaginate from "react-paginate";
import style from "../HelloWorld.module.scss";
import FetchUsersForm from "../Forms/FetchUsersForm";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalRectSeries,
  Highlight,
  ShowcaseButton,
  VerticalGridLines,
  HorizontalGridLines,
  BarSeries,
  LabelSeries,
} from "react-vis";

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

  const [dividedBy3State, setdividedBy3] = useState<any>(15);
  const [dividedBy7State, setdividedBy7] = useState<any>(20);
  const [allNumbersState, setallNumbers] = useState<any>(25);
  const [diagramItemsSum, setdiagramItems] = useState<any>(0);

  let diagramItems = [];

  useEffect(() => {
    let dividedBy3 = 0;
    let dividedBy7 = 0;
    let allNumbers = 0;

    for (let i = 1; i <= posts.length; i++) {
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

    diagramItems.push(dividedBy3, dividedBy7, allNumbers);

    setdiagramItems(diagramItems);

    console.log(typeof dividedBy3State);
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

  const linkExample = { href: "#" };
  const calloutItemsExample = [
    {
      id: "action_1",
      title: "Info",
      icon: <Icon iconName={"Edit"} />,
    },
    { id: "action_2", title: "Popup", icon: <Icon iconName={"Add"} /> },
  ];


  function _LoadAsyncData(): Promise<any> {
      return new Promise<any>((reolve, reject ) => {
          const data =
          {
            labels: ['3', '7', 'ALL'],
            datasets: [
              {
                label: 'SPFx',
                data: [dividedBy3State, dividedBy7State, allNumbersState]
              }
            ]
          };
          reolve(data)
      })
  }

  return (
    <div>
      {posts.length === 0 ? (
        <ProgressIndicator label="Loading" />
      ) : (
        <Dashboard
          widgets={[
            {
              title: "SPFx",
              widgetActionGroup: calloutItemsExample,
              size: WidgetSize.Box,
              body: [
                {
                  id: "t1",
                  title: "Посты",
                  content: (
                    <Text>
                      <div>
                        <div>
                          <DefaultButton
                            secondaryText="Открыть профиль"
                            onClick={toggleHideDialog}
                            text="Открыть профиль"
                          />
                        </div>
                        <>
                          <Dialog
                            hidden={hideDialog}
                            onDismiss={toggleHideDialog}
                            modalProps={modalProps}
                          >
                            {pickedUser.length === 0 ? (
                              <div>Пожалуйста, выберите сообщение</div>
                            ) : (
                              <FetchUsersForm pickedUser={pickedUser} />
                            )}
                          </Dialog>
                        </>
                      </div>
                      <DetailsList
                        items={displayPosts}
                        columns={columns}
                        selectionPreservedOnEmptyClick={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="select row"
                        onItemInvoked={PickedUser}
                      />
                      <div>
                        <ReactPaginate
                          previousLabel={"Previous"}
                          netLabel={"Next"}
                          pageCount={pageCount}
                          onPageChange={changePage}
                          containerClassName={style.paginationBttns}
                          previousLinkClassName={"previousBttn"}
                          nextLinkClassname={"nextBttn"}
                          disableClassname={"paginationDisabled"}
                          activeClassName={"paginationActive"}
                        />
                      </div>
                    </Text>
                  ),
                },
                {
                  id: "t2",
                  title: "Диаграмма",
                  content: (
                    <Text>
                      <ChartControl
                      type='bar'
                      datapromise={_LoadAsyncData()}
                      />
                    </Text>
                  ),
                },
                {
                  id: "t3",
                  title: "Tab 3",
                  content: (
                    <Text>
                    </Text>
                  ),
                },
              ],
            },
          ]}
        />
      )}
    </div>
  );
};

export default Posts;
