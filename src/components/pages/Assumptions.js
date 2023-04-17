// App.js
import Chart from "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import {useState} from "react";
import {MonthlySHMData} from '.././components/MonthlySHMData.js';
import {InclusionData} from '.././components/InclusionData.js';
import {NetworkData} from '.././components/NetworkData.js';
import {RewardData} from '.././components/RewardData.js';
import ComboChart from ".././components/LineChart2";
import LineChart from ".././components/LineChart3";
import LineChart2 from ".././components/LineChart4";
import StabilityFactor from ".././components/StabilityFactor";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

Chart.defaults.elements.line.borderWidth = 2;
Chart.defaults.elements.point.radius = 2;

export default function Emissions() {
  const [chartData] = useState({
    labels: InclusionData.map((data) => data.Validator_Standby_Ratio),
    datasets: [
      {
        label: "Total Nodes",
        data: InclusionData.map((data) => data.Total_Nodes),
        yAxisID: 'y1'
      }, {
        label: 'Time Spent Validating %',
        data: InclusionData.map((data) => data.Time_Validating),
        type: 'line',
        order: 0,
        yAxisID: 'y'
      }
    ]
  });

  const [chartData2] = useState({
    labels: MonthlySHMData.map((data) => data.VSRatio),
    datasets: [
      {
        label: "$0.25",
        data: MonthlySHMData.map((data) => data.example1)
      }, {
        label: "$0.50",
        data: MonthlySHMData.map((data) => data.example2)
      }, {
        label: "$0.75",
        data: MonthlySHMData.map((data) => data.example3)
      }, {
        label: "$1.00",
        data: MonthlySHMData.map((data) => data.example4)
      }, {
        label: "$1.25",
        data: MonthlySHMData.map((data) => data.example5)
      }, {
        label: "$1.50",
        data: MonthlySHMData.map((data) => data.example6)
      }, {
        label: "$1.75",
        data: MonthlySHMData.map((data) => data.example7)
      }, {
        label: "$2.00",
        data: MonthlySHMData.map((data) => data.example8)
      }
    ]
  });

  const [chartData3] = useState({
    labels: NetworkData.map((data) => data.VSRatio),
    datasets: [
      {
        label: 'Network Cost $',
        data: NetworkData.map((data) => data.NetworkCost),
        yAxisID: 'y'
      }, {
        label: 'Network Reward $',
        data: RewardData.map((data) => data.SHMPrice),
        yAxisID: 'y1',
      },


    ]
  });

  return (<div className="App pt-5">





    <h2 className="text-lg font-bold">What is the FDAO?</h2>

    <p className="py-5">
      The FDAO stands for Foundation/DAO. When any network is first launched, it starts out a bit centralized and becomes more and more decentralized over time as more community members participate. This was true for Bitcoin, Ethereum and most other networks and will be true for Shardeum as well. In the case of Shardeum we have planned a smooth transition from the Foundation to a DAO. The Shardeum network will always have the features of DAO from launch, but in order to propose or vote, an account must have more SHM than some threshold amount. Initially only the Foundation will have more SHM than the threshold. Over time the threshold amount will be lowered by voting. This will allow more and more community members to start participating and transitioning control from the Foundation to a DAO.
    </p>


    <h2 className="text-lg font-bold">What is the Stability Factor / Stable Price?</h2>
    <p className="py-5">
      The Stable Price is simply the average of the recent SHM price. For example the average SHM spot price over the last 5 days. The Stable Price and Stability Factor are updated and posted to an account in the Shardeum network once a day and becomes available for the algorithms in the network to use. For example if the node reward is set to $1/hour and the SF is set to 2, then if a node earned $24 it would receive 12 SHM as the reward. Likewise the SF is used to determine the SHM amount for transaction fees and validator staking based on the USD amounts set by the FDAO. This ensures that even if the SHM price is very volatile, the transaction fees, the node reward and staking amounts will be stable in terms of the USD.




    </p>


      <StabilityFactor/>


    <h2 className="text-lg font-bold">What is the Standby:Active Vaidator Ratio (S:A Ratio)?</h2>
      <p className="py-5">
        The S:A ratio is the number of standby nodes to the number of active nodes. The S:A ratio being high help to make the network more decentralized and hard to attack with a 51% take over or Sybil attack. It is good for the FDAO to monitor this and increase the node reward in order to increase the S:A ratio. Nodes in standby are randomly picked to join the network and become active and nodes that were active for a long time are cycled out. This kind of rotation increases the decentralization of the network and makes it difficult to do a 51% or Sybil attack. Nodes only earn a reward when they are active. A node can collect the reward after it has been cycled out and is no longer active. Giving a reward to standby nodes incentives them to try and collect the reward without actually participating in the network and going active.
      </p>
    <h2 className="text-lg font-bold">S:A Ratio - Inclusion Time</h2>
    <p className="py-5">The graph below shows the correlation between the S:A ratio and the percentage of time that a validator will be active (earning node reward $). In principle, a higher S:A ratio will mean validator nodes spend less time actively validating (based on probability).</p>
    <p>For example, if the network had an S:A Ratio of 1:1, then based on math, each node would spend around 50% of the time participating in the network as an active node. If this ratio changed to 2:1, the time as an active validator would reduce to around 33%.</p>
    <ComboChart chartData={chartData}/>
    <h2 className="text-lg font-bold">S:A Ratio - Monthly Reward</h2>
    <p className="py-5">The graph below highlights the impact of the S:A ratio and Node Reward per Hour $ on Monthly Reward $. As the S:A ratio increases, the network becomes less profitable for the validator nodes; this is because, with a higher S:A ratio, the overall size of the network in terms of validator nodes increases, essentially the same amount of node reward is distributed to a higher number of nodes.</p>
    <p>For example, if the S:A ratio is 1:1 and the network size (active validators) is 1300 with a node reward of 1$ per hour, the total network size would be 2600 (total network size (active + standby nodes)). The reward calculation per hour would be:</p>
    <p className="font-bold py-5">1300 (active validators * 1$ (node reward per hour) / 2600 (total network size)) = $0.50 (actual node reward per hour)</p>
    <p>With a 2:1 S:A ratio and the network size (active validators) is 1300 with a node reward of 1$ per hour, the total network size would be 3900 (total network size (active + standby nodes)). The reward calculation per hour would be:</p>
    <p className="font-bold py-5">1300 (active validators * 1$ (node reward per hour) / 3900 (total network size)) = $0.33 (actual node reward per hour)</p>

<LineChart chartData={chartData2}/>
    <h2 className="text-lg font-bold">S:A Ratio - Network Cost vs Reward (Equilibrium)</h2>
      <p className="py-5">The graph below demonstrates the relationship between the Network Operating Cost $ and Network Reward $. At a targeted APY%, the increased S:A ratio increases the operating cost of the network.</p>
      <p>For example, if the network is targeting node APY at 50% and running a validator node costs $10 (per day). With an S:A ratio of 1:1 and a network size of 1300 nodes (active validators), the total network size would be 2600 (total network size (active + standby nodes)). The network operating cost calculation per day would be:</p>
      <p className="font-bold py-5">2600 (total network size) * (10 ( node operating cost per day) * 50% (target APY)) = $13,000 (network operating cost per day)</p>
      <p>With a 2:1 S:A ratio and a network size of 1300 nodes (active validators), the total network size would be 3900 (total network size (active + standby nodes)). The network operating cost per day would be:</p>
      <p className="font-bold py-5">3900 (total network size) * (10 ( node operating cost per day) * 50% (target APY)) = $19,500 (network operating cost per day)</p>
      <p>When considering Network Reward $, the total reward is based on the target APY% and the Node Reward $/hr. At some point, the Network Operating Cost $ will intersect the Network Reward $; this is the maximum S:A ratio the network can maintain at a target APY%. </p>
        <p className="py-5">The maximum S:A ratio (when network operating cost $ intersects the network Reward $) depends on network variables that the FDAO controls or monitors (see parameters tab).</p>

  <LineChart2 chartData={chartData3}/>





      <h2 className="text-lg font-bold">Why No Pre-defined Issuance Schedule?</h2>
        <p className="py-5 font-bold">
          Show Linear and Scaling Issuance Models
        </p>
        <p className="py-5 font-bold">
          Importance of Controllable Issuance - Vertical vs Horizontal Networks
        </p>

        <p className="py-5 font-bold">
          Demo issuance failure with Linear or Scaling issuance
        </p>

        <p className="py-5 font-bold">
          Maximum Profitable S:A Ratio Based on Pre-defined Issuance
        </p>


  </div>);
}
