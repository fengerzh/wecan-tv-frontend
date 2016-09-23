import React, { Component, PropTypes } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import RichTextEditor from 'react-rte';

class AProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      pro_desc: RichTextEditor.createEmptyValue(),
    };
    this.onChange = this.onChange.bind(this);
    // this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    // 当登录状态发生变化时执行以下代码
    this.setState({
      pro_desc: RichTextEditor.createValueFromString(newProps.initialValues.pro_desc, 'html'),
    });
  }

  // 当富文本编辑器发生变化时，需要修改state里的内容
  onChange(value) {
    this.setState({
      pro_desc: value,
    });
  }

  // 提交表单
  submit(values) {
    const form = new FormData();
    form.append('pro_name', values.pro_name);
    form.append('group_name', values.group_name);
    form.append('field_id', values.field_id);
    form.append('pro_desc', this.state.pro_desc.toString('html'));

    const token = localStorage.getItem('id_token') || null;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      method: 'POST',
      body: form,
    };
    return fetch(`http://api.we.com/jwtaproject/update?id=${values.ida_project}`, config)
      .then(response =>
        response.text().then(text => ({ text, response }))
      ).then(({ text, response }) => {
        if (!response.ok) {
          return Promise.reject(text);
        }
        return text;
      })
      .catch(err => {
        throw new SubmissionError({ _error: JSON.parse(err).message });
      });
  }

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div className="form-group">
          <label htmlFor="pro_name">名称</label>
          <Field className="form-control" name="pro_name" component="input" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="pro_desc">描述</label>
          <RichTextEditor value={this.state.pro_desc} onChange={this.onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="group_name">团队</label>
          <Field className="form-control" name="group_name" component="input" type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="field_id">分类</label>
          <div>
            <Field className="form-control" name="field_id" component="select">
              <option value="20">智能硬件</option>
              <option value="21">机器人</option>
              <option value="22">云计算</option>
            </Field>
          </div>
        </div>
        {error && <strong>{error}</strong>}
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
    );
  }
}

AProjectForm.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string,
  initialValues: PropTypes.object,
};

export default reduxForm({
  form: 'aproject',
})(AProjectForm);
