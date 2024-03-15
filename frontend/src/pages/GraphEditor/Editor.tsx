/* eslint-disable react-refresh/only-export-components */
import { DRAWER_ANIMATION_IN_MILLISECONDS } from "components/Drawer";
import { PropsWithChildren, createContext, useState } from "react";
import { CommonDrawerProps, drawers } from "./Drawers";
import "./Editor.css";
import axios from "axios";

export enum DrawerName {
  newNode,
}

export type Editor = {
  drawerName: DrawerName;
  drawerVisible: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  drawerProps: any;
  closeEditorDrawer: () => void;
  showDrawer: <T extends DrawerName>(
    type: T,
    /**
     * The type below automatically suggests the correct props for the chosen Drawer name.
     * If the Drawer has no specific props, it uses only the Common ones.
     */
    props: Parameters<(typeof drawers)[T]>[0] | CommonDrawerProps
  ) => void;
};

export const editor = createContext({} as Editor);

export function EditorProvider({ children }: PropsWithChildren) {
  const [drawerName, setDrawerName] = useState<DrawerName>(DrawerName.newNode);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerProps, setDrawerProps] = useState({});
  const [income, setIncome] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState(Boolean);

  // Saving policy and send it to server side and DB

  const savePolicy = () => {
    const nodeObjSample = {
      node: {
        condition: "Age >= 40",
        true: {
          node: {
            condition: "Age < 50",
            true: true,
            false: false,
          },
        },
        false: {
          node: {
            condition: "Income > 3000",
            true: {
              node: {
                condition: "Age > 30",
                true: true,
                false: false,
              },
              false: false,
            },
          },
        },
      },
    };

    axios
      .post("http://127.0.0.1:8000/vom-receiver/node", {
        node_string: nodeObjSample,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {});
  };

  // Saving policy and send it to server side and DB

  const sendConditions = () => {
    axios
      .post("http://127.0.0.1:8000/vom-execution-engine/response", {
        age: age,
        income: income,
      })
      .then(function (response) {
        setResult(response.data.result.toString());
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {});
  };

  const showDrawer: Editor["showDrawer"] = (type, props) => {
    if (drawerVisible) {
      closeEditorDrawer();
    }
    setTimeout(
      () => {
        setDrawerName(type);
        setDrawerProps(props ?? {});
        setDrawerVisible(true);
      },
      drawerVisible ? DRAWER_ANIMATION_IN_MILLISECONDS : 0
    );
  };

  const closeEditorDrawer = () => {
    setDrawerVisible(false);
    setDrawerProps({});
  };

  return (
    <editor.Provider
      value={{
        drawerName,
        closeEditorDrawer,
        drawerVisible,
        showDrawer,
        drawerProps,
      }}
    >
      {" "}
      <div
        style={{
          backgroundColor: "#f1d4b3",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            marginTop: "25px",
            width: "120%",
            justifyContent: "left",
            height: "80px",
            fontSize: "35px",
            marginRight: "500px",
            color: "#14b8a6",
            fontWeight: "bold",
            backgroundColor: "#f1d4b3",
          }}
        >
          <span
            style={{
              marginLeft: "40px",
              marginTop: "17px",
            }}
          >
            Vom Challenge
          </span>
        </div>
        <div
          style={{
            width: "100%",
            justifyContent: "center",
            backgroundColor: "#f1d4b3",
            height: "80px",
          }}
        >
          <button
            className="submit-button"
            onClick={savePolicy}
            style={{
              marginLeft: "350px",
              marginTop: "25px",
              border: "2px black solid",
              borderRadius: "10px",
              height: "50px",
              width: "200px",
              backgroundColor: "#14b8a6",
              marginBottom: "20px",
              fontWeight: "bold",
              transition: "background-color 0.1s",
            }}
            type="button"
          >
            SUBMIT POLICY
          </button>
        </div>
        <div
          style={{
            width: "100%",
            justifyContent: "center",
            backgroundColor: "#f1d4b3",
            height: "80px",
          }}
        >
          <button
            className="submit-button"
            onClick={sendConditions}
            style={{
              marginLeft: "100px",
              marginTop: "25px",
              border: "2px black solid",
              borderRadius: "10px",
              height: "50px",
              width: "200px",
              backgroundColor: "#14b8a6",
              marginBottom: "20px",
              fontWeight: "bold",
              transition: "background-color 0.1s",
            }}
            type="button"
          >
            SEND CONDITIONS
          </button>
        </div>
      </div>
      <div
        style={{
          height: "1px",
          backgroundColor: "black",
        }}
      ></div>
      <div
        style={{
          backgroundColor: "#f1d4b3",
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
        }}
      >
        <div
          style={{
            border: "2px black solid",
            display: "flex",
            flexDirection: "column",
            borderRadius: "15px",
            backgroundColor: "#14b8a6",
            marginTop: "20px",
            marginLeft: "20px",
            width: "200px",
            height: "80px",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <span
              style={{
                marginTop: "5px",
                fontWeight: "bold",
              }}
            >
              Income:
            </span>
            <span>
              <div
                style={{
                  marginLeft: "5px",
                }}
              >
                <input
                  onChange={(e) => setIncome(e.target.value)}
                  style={{
                    height: "25px",
                    marginLeft: "2px",
                    borderRadius: "5px",
                    width: "50px",
                    textAlign: "center",
                  }}
                />
              </div>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
              }}
            >
              Age:
            </span>
            <span>
              <div
                style={{
                  marginLeft: "5px",
                }}
              >
                <input
                  onChange={(e) => setAge(e.target.value)}
                  style={{
                    height: "25px",
                    marginTop: "5px",
                    borderRadius: "5px",
                    width: "50px",
                    textAlign: "center",
                  }}
                />
              </div>
            </span>
          </div>
        </div>
        <div
          style={{
            width: "300px",
          }}
        >
          <div
            style={{
              border: "2px black solid",
              display: "flex",
              flexDirection: "row",
              borderRadius: "15px",
              backgroundColor: "#14b8a6",
              marginTop: "20px",
              marginLeft: "20px",
              width: "200px",
              height: "80px",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: "50px",
                display: "flex",
                flexDirection: "row",
                marginLeft: "40px",
              }}
            >
              <span
                style={{
                  marginTop: "5px",
                  fontWeight: "bold",
                }}
              >
                Decision:
              </span>
            </div>
            <div
              style={{
                width: "120px",
                marginLeft: "25px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
              style={{
                marginTop:"5px"
              }}
              >
                <span
                  style={{
                    marginTop: "5px",
                    fontWeight: "bold",
                  }}
                >
                  {result && `${result}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {children}
    </editor.Provider>
  );
}
