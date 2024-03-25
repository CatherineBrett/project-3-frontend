import React from "react";
import { ITip } from "../interfaces/tip";
import Card from "./Tip";

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
        <div className="flex">
          {tips?.map((tip) => {
            return <Card key={tip._id} {...tip} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default TipsList;
