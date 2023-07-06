import { useMemo, useContext } from "react";
import DashboardContext from "../Context/DashboardContext";
import { Chart } from "react-charts";
import ResizableBox from "./ResizeableBox";

export default function Awareness() {
  
  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.separater,
    }),
    []
  );

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.cases,
      },
    ],
    []
  );
  const { data, error, isLoading } = useContext(DashboardContext);

  return (
    <>
      {data &&
        data.map((x) => (
          <div
            style={{
              margin: "20px",
              padding: "20px",
              borderBottom: "1px solid #505050",
            }}
          >
            <h1>{x.title}</h1>
            <br />
            <label>
              <strong>Chart ID : </strong>
              {x.chartId}
            </label>
            <br />
            <label>
              <strong>Data Type : </strong>
              {x.dataType}
            </label>
              <ResizableBox>
                <Chart
                  options={{
                    data: dataMaker[x.chartId](x.data), 
                    primaryAxis, 
                    secondaryAxes, 
                  }}
                />
              </ResizableBox>
            </div>
        ))}
    </>
  );
}

const dataMaker = {
  ch_01 : (rawData) => {
    return [
      {
        label: "Phishing",
        data: rawData.map(x => {
          return {
            separater: x.country,
            cases: x.phising
          }
        })
      },
      {
        label: "Awareness",
        data: rawData.map(x => {
          return {
            separater: x.country,
            cases: x.awarness
          }
        })
      }
    ]
  },
  ch_02: (rawData) => {
    return [
      {
        label: "Data Loss",
        data: rawData.map(x => {
          return {
            separater: x.company,
            cases: x['data-loss']
          }
        })
      },
      {
        label: "Compromised Accounts",
        data: rawData.map(x => {
          return {
            separater: x.company,
            cases: x['comromised-accounts']
          }
        })
      },
      {
        label: "Ransomware",
        data: rawData.map(x => {
          return {
            separater: x.company,
            cases: x.ransomware
          }
        })
      },
      {
        label: "Malware",
        data: rawData.map(x => {
          return {
            separater: x.company,
            cases: x.malware
          }
        })
      },
      {
        label: "Total Financial Loss (In Thousands)",
        data: rawData.map(x => {
          return {
            separater: x.company,
            cases: x['total-financial-loss'] / 1000
          }
        })
      },
    ]
  }
}