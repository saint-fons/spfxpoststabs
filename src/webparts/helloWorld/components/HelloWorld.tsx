import * as React from "react";
import styles from "./HelloWorld.module.scss";
import { IHelloWorldProps } from "./IHelloWorldProps";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
  IDocumentCardPreviewProps,
} from "office-ui-fabric-react/lib/DocumentCard";
import Posts from "./Posts/Posts";

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div>
        <Posts />
      </div>
    );
  }
}
