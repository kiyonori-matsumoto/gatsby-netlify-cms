import React from "react";
import Layout from "../components/Layout";
import { push } from "gatsby";
import PageHelmet from "../components/PageHelmet";
import { Content } from "rbx";

const NotFoundPage2: React.FC = () => {
  const [timer, setTimer] = React.useState(5);
  React.useEffect(() => {
    const t = window.setTimeout(() => {
      setTimer(v => {
        if (v === 0) {
          push("/");
          return 0;
        }
        return v - 1;
      });
    }, 1000);
  }, [timer]);
  return (
    <Layout title="404 Not Found">
      <PageHelmet
        title="blog"
        description="404 Not Found"
        url="https://blog.matsukiyo.me/404"
      />
      <div>
        このページは存在していません。
        <br />
        {timer}秒後にトップページに移動します。
      </div>
    </Layout>
  );
};
interface State {
  timeout: number;
}

class NotFoundPage extends React.Component<{}, State> {
  timer = -1;
  constructor(props: {}) {
    super(props);
    this.state = { timeout: 5 };
  }

  componentDidMount() {
    this.timer = window.setInterval(() => {
      if (this.state.timeout === 1) {
        push("/");
        return;
      }
      this.setState({ timeout: this.state.timeout - 1 });
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }

  render() {
    return (
      <Layout title="404 not found">
        <PageHelmet
          title="blog"
          description="404 Not Found"
          url="https://blog.matsukiyo.me/404"
        />
        <Content>
          指定したページが見つかりません。
          <br />
          {this.state.timeout}秒後にトップページに移動します。
        </Content>
      </Layout>
    );
  }
}

export default NotFoundPage2;
