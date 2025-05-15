import React from "react";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="card w-full mt-5 bg-base-100 card-xl shadow-sm">
      <div className="card-body">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="card-title">Category</h2>
          </div>
          <div className="text-end">
            <Link to={"/dashboard/category/create"} className="btn btn-warning">
              Create
            </Link>
          </div>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Created at</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>
                    <Link className="btn btn-secondary">Edit</Link>
                    <Link className="btn btn-danger">Delete</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="justify-end card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Category;
