import getUserByClerkID from "@/utils/auth";
import prisma from "@/utils/db";
import HistoryChart from "@/components/HistoryChart";

const getData = async () => {
  const user = await getUserByClerkID()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return { analyses, avg }
}

const fullScreenStyle = {
  height: '85vh',
  width: '100vw',
  margin: 0,
  paddingBottom: "80px",
  paddingLeft: "32px",
  paddingRight: "32px",
  overflow: 'hidden'
};

export default async function History(){
  const { avg, analyses } = await getData()
  return (
    <div className="w-full h-full">
      <div style={{paddingLeft: "32px"}}>{`Avg. Sentiment ${avg}`}</div>
      <div style={fullScreenStyle}>
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

