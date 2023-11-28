<template>
  <div class="container">
    <div class="leftArea"></div>
    <div class="rightArea">
      <div class="title">
        <span>Our Professor, &ensp;</span>
        <span id="highlight">Huan Chen</span>
      </div>
      <div class="tabPage">
        <el-tabs class="demo-tabs" tab-position="right">
          <el-tab-pane label="Intro.">
            <div style="white-space: pre-line; text-align: right">
              <span>{{ intro }}</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Educ.">
            <el-table
              :highlight-current-row="false"
              class="my-table"
              :data="Educ"
              style="max-width: 100%"
            >
              <el-table-column prop="school" label="畢業學校" width="190" />
              <el-table-column prop="nation" label="國別" width="80" />
              <el-table-column prop="major" label="科系所或主修學門" width="120" />
              <el-table-column prop="degree" label="學位" width="50" />
              <el-table-column prop="date" label="起訖年月" width="150" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Exper.">
            <el-table class="my-table" :data="Expr" style="max-width: 100%">
              <el-table-column prop="now" label="現職" width="30">
                <template #default="scope">
                  {{ scope.row.now ? "✔︎" : "" }}
                </template>
              </el-table-column>
              <el-table-column prop="office" label="服務機關" width="120" />
              <el-table-column prop="depart" label="服務部門" width="120" />
              <el-table-column prop="title" label="職稱" width="80" />
              <el-table-column prop="date" label="起訖年月" width="150" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Contact">
            <div class="contaArea">
              <p>服務單位： {{ Contat.depart }}</p>
              <p>地址： {{ Contat.location }}</p>
              <p>電話：{{ Contat.phone }}</p>
              <p>TAX： {{ Contat.tax }}</p>
              <p>Mail： {{ Contat.mail }}</p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { ElTabs } from "element-plus";

export default defineComponent({
  components: {
    ElTabs,
  },
  setup() {
    const intro =
      "Huan Chen received his B.S. and M.S. (Electrical Engineering) degrees from the National Tsing HuaUniversity, Hsing Chu (Taiwan) in 1993 and 1995, respectively. \n \
                  He earned his Ph.D. (Electrical Engineering) degree fromthe University of Southern California, Los Angeles  (USA)in 2002. \n\
                  He is an member of IEEE since 1999 and he isthe co-author of the book”Radio Resource Management for Multimedia QoS Support in Wireless Cellular Networks“,Kluwer Academic Publishers, Oct. 2003 (ISBN: 1-4020-7623-1). \n \
                  In additional to his academic career experiences, he also worked forXitec Inc., Summitec Co. and Intervideo Inc.  as a summer intern and software engineer from June 1997 to January 2001.\n\
                  Since Feb. 2002 to Feb. 2012, he was faculty members of the Electrical Engineering Department at National Chung Cheng University (Taiwan).\n \
                  He is currently an associate professor with the Department of Computer Science and Engineering, National Chung HsingUniversity (Taiwan).\n \
                  His principle research interests include Wireless Networks, Body Area Networks, Wireless Sensor Networks, Embedded Systems, Network Security, Android and Cloud Applications.";
    const Educ = [
      {
        school: "University of Southern California (USC)",
        nation: "美國",
        major: "電機工程研究所",
        degree: "博士",
        AP: "Prof. C.-C. Jay Kuo",
        date: "86年09月~ 91年12月",
      },
      {
        school: "National Tsing Hua University",
        nation: "中華民國",
        major: "電機工程研究所",
        degree: "碩士",
        AP: "彭 惠 教授",
        date: "82年09月~ 84年08月",
      },
      {
        school: "  National Tsing Hua University	",
        nation: "美國",
        major: "電機工程學系",
        degree: "學士",
        AP: "N/A",
        date: "78年09月~ 82年08月",
      },
    ];

    const Expr = [
      {
        now: true,
        office: "中興大學",
        depart: "資訊科學與工程學系	",
        title: "副教授",
        date: "101年02月至迄今",
      },
      {
        now: false,
        office: "中正大學",
        depart: "電機工程學系	",
        title: "副教授",
        date: "99年08月至101 年02月",
      },
      {
        now: false,
        office: "中正大學",
        depart: "通訊工程學系	",
        title: "(合聘) 副教授",
        date: "99年08月至101 年02月",
      },
      {
        now: false,
        office: "中正大學",
        depart: "學務處畢僑組	",
        title: "組長",
        date: "99年08月至100年08月",
      },
      {
        now: false,
        office: "中正大學",
        depart: "通訊工程學系",
        title: "(合聘) 副教授",
        date: "94年08月至99年08月",
      },
      {
        now: false,
        office: "University of Southern California (USC)",
        depart: "Department of Electrical Engineering",
        title: "RA/TA/Grader",
        date: "90年02月至91年05月、\
            88年02月至89年08月",
      },
      {
        now: false,
        office: "InterVideo Corporation",
        depart: "Software Department",
        title: "Intern Engineer",
        date: "89年09月至90年01月",
      },
      {
        now: false,
        office: "Summitec Corporation",
        depart: "Software Department",
        title: "Software Engineer",
        date: "87年01月至88年01月",
      },
      {
        now: false,
        office: "Xitec Holdings LLC",
        depart: "Software Department",
        title: "Intern Engineer",
        date: "86年06月至86年08月",
      },
      {
        now: false,
        office: "National Tsing Hua University",
        depart: "電機工程學系",
        title: "專任助教",
        date: "84年08月至85年07月",
      },
    ];

    const Contat = {
      depart:
        "Department of Computer Science and Engineering, National Chung Hsing University",
      location: "No.250, Guoguang Rd., South Dist., Taichung 402, Taiwan, R.O.C.",
      phone: " 886-4-22840497 ext. 810",
      tax: "886-4-22853869",
      mail: "huan@nchu.edu.tw",
    };

    return {
      intro,
      Educ,
      Expr,
      Contat,
    };
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap");
span,
p {
  color: #fff;
}
:deep(.el-tabs__item.is-active) {
  color: #fff !important;
  background-color: #8167a9 !important;
}
:deep(.el-tabs__item) {
  font-weight: bold;
  font-size: 1.2rem !important;
  padding: 0rem 1rem !important;
  color: #434343;
}
:deep(.el-table, .el-table__expanded-cell) {
  background-color: transparent;
  color: #fff;
}
:deep(.el-table th) {
  background-color: #fff;
  color: #000;
  font-weight: bold;
}
:deep(.el-table tr) {
  background-color: transparent;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #8167a9;
  color: rgb(40, 38, 38);
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.leftArea {
  width: 35%;
  height: 100%;
  background-image: url("@/assets/professor.png");
  background-size: 130%;
  background-repeat: no-repeat;
  background-position: bottom;
  margin-bottom: 3rem;
}

.rightArea {
  width: 65%;
  height: 100%;
  padding: 2rem;
}

.title {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
}

.title span {
  font-family: "Poppins", sans-serif;
  color: rgb(255, 255, 255);
  font-size: 4rem;
}
#highlight {
  background: #8167a9;
  padding: 0 0.8rem;
  color: rgb(34, 32, 32);
}

.tabPage {
  width: 100%;
  height: 90%;
  margin-top: 2rem;
  /*display: flex;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center*/
}
</style>
