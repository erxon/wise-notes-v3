import { Suspense } from "react";
import Notebooks from "./notebooks";

export default function Page() {
  return (
    <div className="">
      <Suspense fallback={<div>Loading...</div>}>
        <Notebooks />
      </Suspense>
    </div>
  );
}
