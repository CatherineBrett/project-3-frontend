import React from "react";
import Tip from "./Tip";
import { ITip } from "../interfaces/tip";

type Tips = null | Array<ITip>;

function TipsList() {
  const [tips, setTips] = React.useState<Tips>(null);

  React.useEffect(() => {
    async function fetchTips() {
      const resp = await fetch("/api/tips");
      const data = await resp.json();
      setTips(data);
    }
    fetchTips();
  }, []);

  console.log("Here are all the tips we have fetched:");
  console.log(tips);

  
  // TODO: Add Tailwind/CSS to this
  return (
    <section>
      <div>
        <div>
          <div className="h-dvh">
            <h1 className="items=center text-center ">
              Welcome to the Advice Page!
            </h1>
          </div>
          {tips?.map((tip) => {
            return <Tip key={tip._id} {...tip} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default TipsList
