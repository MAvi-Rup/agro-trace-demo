import React from 'react';
import Widget from '../widget/Widget';
import './AdminHome.scss';

const AdminHome = () => {
  return (
    <div className="admin-home">
      <div className="row">
        <div className="col-4">
          <Widget type="stock" />
        </div>
        <div className="col-4">
          <Widget type="balance" />
        </div>
        <div className="col-4">
          <Widget type="users" />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
