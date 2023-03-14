import React from 'react';
import Chart from '../chart/Chart';
import Featured from '../featured/Featured';
import Widget from '../widget/Widget';
import './AdminHome.scss';

const AdminHome = () => {
  return (
    <>
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
          {/* <div className="col-4">
            <Widget type="users" />
          </div> */}

        </div>
        <div className="col-8">
          <Featured />
        </div>
        <div>
        <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>

      </div>
    </>
  );
};

export default AdminHome;
