// export function defaultImg() {
//   const w = () => [255,  255,  255];
//   const _ = () => [0  ,  0  ,  0  ];
//   return [
//     [w(),  _(),  _(),  _(),  _(),  w(),  _(),  _(),  _(),  w(),  _(),  _(),  w(),  w(),  _(),  _(),  w(),  _(),  w(),  _(),  _(),  w(),  _(),  _(),  w(),  w()],
//     [w(),  _(),  _(),  _(),  w(),  _(),  w(),  _(),  w(),  _(),  w(),  _(),  w(),  _(),  w(),  _(),  w(),  _(),  w(),  w(),  _(),  w(),  _(),  w(),  _(),  _()],
//     [w(),  _(),  _(),  _(),  w(),  _(),  w(),  _(),  w(),  w(),  w(),  _(),  w(),  _(),  w(),  _(),  w(),  _(),  w(),  _(),  w(),  w(),  _(),  w(),  _(),  w()],
//     [w(),  _(),  _(),  _(),  w(),  _(),  w(),  _(),  w(),  _(),  w(),  _(),  w(),  _(),  w(),  _(),  w(),  _(),  w(),  _(),  _(),  w(),  _(),  w(),  _(),  w()],
//     [w(),  w(),  w(),  _(),  _(),  w(),  _(),  _(),  w(),  _(),  w(),  _(),  w(),  w(),  _(),  _(),  w(),  _(),  w(),  _(),  _(),  w(),  _(),  _(),  w(),  w()],
//   ]
// }

import { minitelContext } from "minitel-react";
import { useContext } from "react";
import { toRichCharGrid } from "../utils/to_richchargrid.js";
import { ColorTriplet } from "../types.js";

const imgData: ColorTriplet[][] = [
  [[255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [255, 255, 255]],
  [[255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ]],
  [[255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ]],
  [[255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [255, 255, 255], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255]],
  [[255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255]],
  [[255, 255, 255], [255, 255, 255], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [0  , 0  , 0  ], [0  , 0  , 0  ], [255, 255, 255], [255, 255, 255]],
];

export function DefaultImg({ ...props }) {
  const minitel = useContext(minitelContext);

  const grid = toRichCharGrid(imgData, minitel.colors as ColorTriplet[]);

  return <mt-disp widthAlign="start" heightAlign="start" grid={grid} { ...props } />;
}
