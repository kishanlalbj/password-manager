import MaskedText from "./MaskedText";

type TableProps = {
  headers: string[];
  rows: {
    id: string | number;
    application: string;
    password: string;
    hashed: string;
  }[];
  actionable: boolean;
};

const Table = ({ headers, rows }: TableProps) => {
  return (
    <div className="flex items-center justify-center">
      <table className="table w-full  divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers?.map((head) => (
              <th align="left" key={head}>
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows?.map((row) => {
            return (
              <tr className="px-6 py-3" key={row.id}>
                <td>{row.application}</td>
                <td>
                  <MaskedText text={row.hashed}></MaskedText>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
