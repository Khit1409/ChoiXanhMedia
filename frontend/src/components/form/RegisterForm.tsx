import {  faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RegisterForm() {
  return (
    <div className="my-6">
      <div className="flex items-center justify-center">
        <form action="" className="flex flex-col justify-center gap-2">
          <div className="relative flex flex-col justify-center">
            <label htmlFor="" className="absolute ml-2">
              <FontAwesomeIcon icon={faUser} />
            </label>
            <input type="text" className="border rounded w-full" />
          </div>
          <div className="relative flex flex-col justify-center">
            <label htmlFor="" className="absolute ml-2">
              <FontAwesomeIcon icon={faLock} />
            </label>
            <input type="text" className="border rounded w-full" />
          </div>
        </form>
      </div>
    </div>
  );
}
// 