export const LOTTO = [
  'หวยดาวโจนส์ STAR',
  'ลาวประตูชัย',
  'ลาวสันติภาพ',
  'ประชาชนลาว',
  'หวยลาวExtra',
  'ฮานอยอาเซียน',
  'หวยลาว TV',
  'ฮานอย HD',
  'ฮานอย สตาร์',
  'ลาว HD',
  'หวยฮานอย TV',
  'หวยลาวสตาร์',
  'หวยฮานอย กาชาด',
  'ฮานอยสามัคคี',
  'ฮานอยพัฒนา',
  'หวยลาวสามัคคี',
  'ลาวอาเซียน',
  'หวยลาวสามัคคี VIP',
  'หวยลาวSTAR VIP',
  'หวยลาว กาชาด',
  'นิเคอิ รอบเช้า',
  'จีนรอบเช้า',
  'ฮั่งเส็งรอบเช้า',
  'หุ้นไต้หวัน',
  'หุ้นเกาหลี',
  'นิเคอิ รอบบ่าย',
  'จีนรอบบ่าย',
  'ฮั่งเส็งรอบบ่าย',
  'หุ้นสิงคโปร์',
  'หุ้นไทยปิดเย็น',
  'หุ้นอินเดีย',
  'หุ้นอียิปต์',
  'หุ้นเยอรมัน',
  'หุ้นอังกฤษ',
  'หุ้นรัสเซีย',
  'หุ้นดาวโจนส์',
  'นิเคอิ(เช้า) VIP',
  'เวียดนาม VIP เช้า',
  'จีน(เช้า) VIP',
  'ฮั่งเส็ง(เช้า) VIP',
  'ไต้หวัน VIP',
  'เกาหลี VIP',
  'นิเคอิ(บ่าย) VIP',
  'เวียดนาม VIP บ่าย',
  'จีน(บ่าย) VIP',
  'ฮั่งเส็ง(บ่าย) VIP',
  'หุ้นลาว VIP',
  'เวียดนาม VIP เย็น',
  'สิงค์โปร์ VIP',
  'เยอรมัน VIP',
  'อังกฤษ VIP',
  'รัสเซีย VIP',
  'ดาวโจนส์ VIP',
  'นิเคอิ(เช้า) พิเศษ',
  'เวียดนาม พิเศษ เช้า',
  'จีน(เช้า) พิเศษ',
  'ฮั่งเส็ง(เช้า) พิเศษ',
  'ไต้หวัน พิเศษ',
  'เกาหลี พิเศษ',
  'นิเคอิ(บ่าย) พิเศษ',
  'เวียดนาม พิเศษ บ่าย',
  'จีน(บ่าย) พิเศษ',
  'ฮั่งเส็ง(บ่าย) พิเศษ',
  'เวียดนาม พิเศษ เย็น',
  'สิงค์โปร์ พิเศษ',
  'เยอรมัน พิเศษ',
  'อังกฤษ พิเศษ',
  'รัสเซีย พิเศษ',
  'ดาวโจนส์ พิเศษ',
  'หวยลาวพัฒนา',
  'หวยฮานอย พิเศษ',
  'หวยฮานอย',
  'หวยฮานอย VIP',
  'หวยฮานอยรอบดึก',
  'หวยดาวโจนส์อเมริกา',
  'หวยฮานอย-โฮจิมินห์',
  'หวยลาวทดแทน (ทุกวัน)',
  'หวยยูโร',
  'หวยมาเลย์',
  'หวยลาวนิยม',
  'หวยลาว VIP',
];

export type RandomLottoType1 = {
  mainNumber: string;
  singleNumber: {
    first: string;
    second: string;
  };
  doubleNumber: {
    first: string[];
    second: string[];
  };
  tripleNumber: string[];
};

export const randomLotto = (): RandomLottoType1 => {
  const twoNum = randomTwoDifferentNumber(0, 9);
  const singleNumber = [twoNum[0], twoNum[1]];
  const mainNumber = randomFromList(singleNumber, 1);

  const threeNum = randomThreeDifferentNumber(0, 9);
  const threeNum2 = randomThreeDifferentNumber(0, 9);
  const doubleNumber = [
    [
      singleNumber[0] * 10 + threeNum[0],
      singleNumber[0] * 10 + threeNum[1],
      singleNumber[0] * 10 + threeNum[2],
    ],
    [
      singleNumber[1] * 10 + threeNum2[0],
      singleNumber[1] * 10 + threeNum2[1],
      singleNumber[1] * 10 + threeNum2[2],
    ],
  ];

  const twoNumberList = randomFromList([...doubleNumber[0], ...doubleNumber[1]], 3);
  const threeNum3 = randomThreeDifferentNumber(0, 9);
  const tripleNumber = [
    threeNum3[0] * 100 + twoNumberList[0],
    threeNum3[1] * 100 + twoNumberList[1],
    threeNum3[2] * 100 + twoNumberList[2],
  ];

  return {
    mainNumber: mainNumber[0].toString(),
    singleNumber: {
      first: singleNumber[0].toString(),
      second: singleNumber[1].toString(),
    },
    doubleNumber: {
      first: doubleNumber[0].map((item) => item.toString().padStart(2, '0')),
      second: doubleNumber[1].map((item) => item.toString().padStart(2, '0')),
    },
    tripleNumber: tripleNumber.map((item) => item.toString().padStart(3, '0')),
  };
};

const randomTwoDifferentNumber = (min: number, max: number) => {
  const first = Math.floor(Math.random() * (max - min + 1)) + min;
  let second = Math.floor(Math.random() * (max - min + 1)) + min;

  while (first === second) {
    second = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return [first, second];
};

const randomThreeDifferentNumber = (min: number, max: number) => {
  const first = Math.floor(Math.random() * (max - min + 1)) + min;
  let second = Math.floor(Math.random() * (max - min + 1)) + min;
  let third = Math.floor(Math.random() * (max - min + 1)) + min;

  while (first === second) {
    second = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  while (first === third || second === third) {
    third = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return [first, second, third];
};

const randomFromList = (list: number[], total: number) => {
  const result: number[] = [];

  for (let i = 0; i < total; i++) {
    const index = Math.floor(Math.random() * list.length);
    result.push(list[index]);
  }

  return result;
};
