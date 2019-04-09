import { getContractAddresses, userAddresses } from "./utils";
import * as chai from 'chai';

describe("Members page", () => {
    let addresses: string[];
    let daoAddress: string;

    before(async () => {
      chai.Should();
      addresses = getContractAddresses();
      daoAddress = addresses.Avatar.toLowerCase();
    });

    it("should exist", async () => {
      await browser.url(`http://127.0.0.1:3000/dao/${daoAddress}/members`);
      const title = await browser.getTitle();
      title.should.be.equal("Alchemy | DAOstack");

      // check if we see a member
      const address = userAddresses[0];
      const memberElement = await $(`*[data-test-id="member_${address}"]`);
      await memberElement.waitForExist();
      // TODO: we should see the repuation of this member
      const reputationElement = await $(`*[data-test-id="member_${address}"] *[data-test-id="reputation"]`);
      const reputation = await reputationElement.getText();
      reputation.should.have.string("% Rep.");
    });
});
