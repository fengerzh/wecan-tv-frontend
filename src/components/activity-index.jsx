import React from 'react';

class ActivityIndex extends React.Component {
  constructor(props) {
    super(props);

    const data = localStorage.getItem('activityindex');
    if (data) {
      // 如果local storage已经有数据了，则直接获取
      this.state = {
        activities: JSON.parse(data),
      };
    } else {
      this.state = {
        activities: [],
      };
    }
  }

  componentDidMount() {
    const data = localStorage.getItem('activityindex');
    if (!data) {
      // 如果没有数据，则调用ajax以获取数据
      const source = 'http://api.we.com/activities';
      fetch(source).then(response => response.json()).then((json) => {
        // 数据获取成功
        this.setState({
          activities: json,
        });
        // 把数据保存在local storage中
        localStorage.setItem('activityindex', JSON.stringify(json));
      });
    }
  }

  render() {
    // 显示活动列表
    const rows = [];
    this.state.activities.forEach((element) => {
      rows.push(
        <div key={element.act_id}>
          <div>{element.act_id}</div>
          <div>{element.act_title}</div>
        </div>
      );
    });

    return <div>{rows}</div>;
  }
}

export default ActivityIndex;
