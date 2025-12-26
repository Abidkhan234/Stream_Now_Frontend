import AccountLayout from "../layout/AccountLayout";

import MyProfile from "@/components/custom-components/accountPageSections/MyProfile";
import Subscription from "@/components/custom-components/accountPageSections/Subscription";
import PaymentPlan from "@/components/custom-components/accountPageSections/PaymentPlan";
import AgeRestriction from "@/components/custom-components/accountPageSections/AgeRestriction";
import About from "@/components/custom-components/accountPageSections/About";
import Setting from "@/components/custom-components/accountPageSections/Setting";

const AccountPanel = () => {
  return (
    <main className="flex flex-col gap-6">
      <>
        <AccountLayout id={`my-profile`} title="My Profile">
          <MyProfile />
        </AccountLayout>
      </>
      <>
        <AccountLayout id={`subscription`} title="Subscriptions">
          <Subscription />
        </AccountLayout>
      </>
      <>
        <AccountLayout id={`payment-method`} title="Payment Method">
          <PaymentPlan />
        </AccountLayout>
      </>
      <>
        <AccountLayout id={`age-restriction`} title="Age Restrictions">
          <AgeRestriction />
        </AccountLayout>
      </>
      <>
        <AccountLayout id={`setting`} title="Settings">
          <Setting />
        </AccountLayout>
      </>
      <>
        <AccountLayout id={`about`} title="About">
          <About />
        </AccountLayout>
      </>
    </main>
  );
};

export default AccountPanel;
