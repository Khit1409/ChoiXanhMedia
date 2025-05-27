"use client";
import { RootState } from "@/redux/store";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface FormResponse {
  ThongBao: string;
  maloi: string;
  memberid: string;
  user: string;
  chucnang: string;
  thongtinthanhvien: [
    {
      tennhom: string;
      cauhinh: {
        tieude: string;
        kieu: string;
        nhandan: string;
        batbuoc: string;
        sua: string;
        huongdan: string;
        giatri: string;
        nhom: string;
      };
    }
  ];
}

const changeTypeInput = [
  { name: "inputext", type: "text" },
  { name: "inputemail", type: "email" },
  { name: "inputtel", type: "tel" },
];

export default function UserForm() {
  const [data, setData] = useState<FormResponse[]>([]);
  const { users } = useSelector((state: RootState) => state.auths);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://choixanh.com.vn/ww1/thongtinthanhvien.asp?userid=${users?.userid}&pass=${users?.pass}`
        );
        if (response.data) {
          setData(response.data);
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [users]);

  return (
    <div>
      <div className="p-4 bg-light rounded">
        <form action="">
          <div className="py-2">
            <button className="btn btn-primary" type="submit">
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
          {data &&
            data.map(
              (db) =>
                db.thongtinthanhvien &&
                db.thongtinthanhvien.map((tt, index) => {
                  const matchedInput = changeTypeInput.find(
                    (type) => type.name === tt.cauhinh.kieu
                  );
                  return (
                    <div key={index}>
                      <label htmlFor="" className="form-label">
                        {tt.cauhinh.tieude}
                      </label>
                      <input
                        type={matchedInput ? matchedInput.type : "text"}
                        className="form-control"
                        placeholder={tt.cauhinh.nhandan}
                      />
                    </div>
                  );
                })
            )}
        </form>
      </div>
    </div>
  );
}
