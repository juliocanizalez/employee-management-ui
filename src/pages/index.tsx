import { title, subtitle } from "@/components/common/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="text-center justify-center">
          <span className={title()}>Welcome to Employee Portal</span>
          <br />
          <span className={subtitle()}>A site to manage your&nbsp;</span>
          <span className={subtitle({ color: "violet" })}>employees</span>
        </div>
      </section>
    </DefaultLayout>
  );
}
