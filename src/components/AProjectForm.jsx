import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import RichTextEditor from 'react-rte';

class AProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      value: RichTextEditor.createEmptyValue(),
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // 当登录状态发生变化时执行以下代码
    this.setState({
      value: RichTextEditor.createValueFromString(newProps.initialValues.pro_desc, 'html'),
    });
  }

  onChange(value) {
    this.setState({ value });
    // if (this.props.onChange) {
    //   this.props.onChange(
    //     value.toString('html')
    //   );
    // }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pro_name">名称</label>
          <Field className="form-control" name="pro_name" component="input" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="pro_desc">描述</label>
          <RichTextEditor value={this.state.value} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="group_name">团队</label>
          <Field className="form-control" name="group_name" component="input" type="text" />
        </div>
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    );
  }
}

AProjectForm.propTypes = {
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
};

AProjectForm = reduxForm({
  form: 'aproject',
})(AProjectForm);

export default AProjectForm;
