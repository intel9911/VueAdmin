<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12>
          <v-subheader>Remote Attendance Welfare System (RAWS)</v-subheader>
          <v-subheader> RWA03 </v-subheader>
          <v-layout> </v-layout>
          <v-toolbar flat color="white" class="toolbar1">
            <v-layout column class="justify-center">
              <v-btn color="primary" dark class="mb-2">222</v-btn>
              <div class="toolbar-div">
                <v-btn color="blue" icon dark><v-icon>cached</v-icon></v-btn>
              </div>
            </v-layout>
            <v-layout>
              <SortedTable :values="values">
                <thead>
                  <tr>
                    <th scope="col" class="theader"></th>
                    <th scope="col" class="theader"></th>
                    <th scope="col" class="theader">
                      Mins Before Start
                    </th>
                    <th scope="col" class="theader">
                      Mins after End
                    </th>
                  </tr>
                </thead>
                <tbody slot="body" slot-scope="sort">
                  <tr v-for="value in sort.values" :key="value.id">
                    <td class="tbody">{{ value.id }}</td>
                    <td class="tbody">{{ value.name }}</td>
                    <td class="tbody">{{ value.start }}</td>
                    <td class="tbody">{{ value.end }}</td>
                  </tr>
                </tbody>
              </SortedTable>
            </v-layout>
            <v-btn color="primary" dark class="mb-2">ColdStart</v-btn>
            <v-btn color="primary" dark class="mb-2">Sign-In</v-btn>
            <v-btn color="primary" dark class="mb-2">Sign-Off</v-btn>
            <v-btn color="primary" dark class="mb-2">Welfare</v-btn>
            <v-btn color="primary" dark class="mb-2">Memo</v-btn>
            <v-flex xs1 sm1 d-flex>
              <v-select :items="frequencies" label="2" solo></v-select>
            </v-flex>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-data-table
            :headers="headers1"
            :items="desserts1"
            class=""
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ props.item.id }}</td>
              <td class="text-xs-center">{{ props.item.date }}</td>
              <td class="text-xs-center">{{ props.item.nextdue }}</td>
              <td class="text-xs-center" style="background-color:cyan">
                {{ props.item.nextevent }}
              </td>
              <td class="text-xs-center">{{ props.item.employee }}</td>
              <td class="text-xs-center">{{ props.item.contact }}</td>
              <td class="text-xs-center">{{ props.item.location }}</td>
              <td class="text-xs-center">{{ props.item.shift }}</td>
              <td class="text-xs-center" style="background-color:red">
                {{ props.item.status }}
              </td>
              <td class="text-xs-center">{{ props.item.nextrdq }}</td>
            </template>
            <template slot="no-data">
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
          <v-subheader> Audit logs </v-subheader>
          <v-layout> </v-layout>
          <v-toolbar flat color="white">
            <v-btn color="blue" icon dark><v-icon>cached</v-icon></v-btn>
            <v-btn color="primary" dark class="mb-2">Audit Log</v-btn>
            <v-btn color="primary" dark class="mb-2">Clear Audit Log</v-btn>
            <v-btn color="primary" dark class="mb-2">Clear Yest</v-btn>
            <v-btn color="primary" dark class="mb-2">Clear Today</v-btn>
            <v-btn color="primary" dark class="mb-2">Clear Tomorrow</v-btn>
            <v-btn color="primary" dark class="mb-2">Purge>24</v-btn>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-data-table
            :headers="headers2"
            :items="desserts2"
            class=""
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-center">{{ props.item.id }}</td>
              <td
                :style="
                  'background-color:' +
                    (props.item.color == 0 ? 'none' : 'yellow')
                "
                class="text-xs-center"
              >
                {{ props.item.qddate }}
              </td>
              <td class="text-xs-center">{{ props.item.qdtime }}</td>
              <td class="text-xs-center">{{ props.item.nextevent }}</td>
              <td
                :style="
                  'background-color:' +
                    (props.item.color == 0 ? 'none' : 'yellow')
                "
                class="text-xs-center"
              >
                {{ props.item.employee }}
              </td>
              <td class="text-xs-center">{{ props.item.contact }}</td>
              <td
                :style="
                  'background-color:' +
                    (props.item.color == 0 ? 'none' : 'yellow')
                "
                class="text-xs-center"
              >
                {{ props.item.location }}
              </td>
              <td
                :style="
                  'background-color:' +
                    (props.item.color == 0 ? 'none' : 'yellow')
                "
                class="text-xs-center"
              >
                {{ props.item.shiftdate }}
              </td>
              <td
                :style="
                  'background-color:' +
                    (props.item.color == 0 ? 'none' : 'yellow')
                "
                lass="text-xs-center"
              >
                {{ props.item.sftime }}
              </td>
              <td
                :style="
                  'background-color:' +
                    (props.item.color == 0 ? 'none' : 'yellow')
                "
                class="text-xs-center"
              >
                {{ props.item.status }}
              </td>
              <td class="text-xs-center">{{ props.item.rtcid }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import API from "@/api";
import VWidget from "@/components/VWidget";
import Material from "vuetify/es5/util/colors";
export default {
  components: {
    VWidget
  },
  data: () => ({
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    e1: null,
    codes: [],
    color: Material,
    selectedTab: "tab-1",
    dialog: false,
    headers1: [
      {
        text: "No",
        align: "center",
        sortable: true,
        value: "id"
      },
      { text: "Date", align: "center", sortable: true, value: "date" },
      { text: "Next Due", align: "center", sortable: true, value: "nextdue" },
      {
        text: "Next Event",
        align: "center",
        sortable: true,
        value: "nextevent"
      },
      { text: "Employee", align: "center", sortable: true, value: "employee" },
      { text: "Contact", align: "center", sortable: true, value: "contact" },
      { text: "Location", align: "center", sortable: true, value: "location" },
      { text: "Shift", align: "center", sortable: true, value: "shift" },
      { text: "Status", align: "center", sortable: true, value: "status" },
      { text: "NextRDQ", align: "center", sortable: true, value: "nextrdq" }
    ],
    headers2: [
      {
        text: "No",
        align: "center",
        sortable: true,
        value: "id"
      },
      { text: "QD Date", align: "center", sortable: true, value: "qddate" },
      {
        text: "QD Time Due",
        align: "center",
        sortable: true,
        value: "qdtime"
      },
      {
        text: "Next Event",
        align: "center",
        sortable: true,
        value: "nextevent"
      },
      { text: "Employee", align: "center", sortable: true, value: "employee" },
      { text: "Contact", align: "center", sortable: true, value: "contact" },
      { text: "Location", align: "center", sortable: true, value: "location" },
      {
        text: "Shift Date",
        align: "center",
        sortable: true,
        value: "shiftdate"
      },
      { text: "S/F Time", align: "center", sortable: true, value: "sftime" },
      { text: "Status", align: "center", sortable: true, value: "status" },
      { text: "RTCID", align: "center", sortable: true, value: "rtcid" }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      code: "",
      category: "",
      description: ""
    },
    defaultItem: {
      code: "",
      category: "",
      description: ""
    },
    search: "",
    items: ["Training", "Scheduled Shift", "Annual Leave", "Other"],
    categories: [
      "Annual Leave",
      "Leave Without pay",
      "Long Service Leave",
      "Meeting",
      "No Show",
      "Other",
      "Other(nRDO)",
      "RDO",
      "Scheduled Shift",
      "Sick",
      "Sleepover",
      "Training",
      "Workers Comp"
    ],
    frequencies: ["1", "2", "3", "4", "5"],
    values: [
      { name: "Show shifts due for sign-on", id: 2, start: 60, end: 1 },
      { name: "COLDSTART call employees", id: 1, start: 15, end: 1 },
      { name: "Show shifts due for sign-off", id: 3, start: 15, end: 1 }
    ]
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Code" : "Edit Code";
    },
    activity() {
      return API.getActivity();
    },
    posts() {
      return API.getPost(3);
    },
    siteTrafficData() {
      return API.getMonthVisit;
    },
    locationData() {
      return API.getLocation;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      (this.desserts1 = [
        {
          id: "1",
          date: "22/04/2018",
          nextdue: "06:00",
          nextevent: "Sign-In",
          employee: "[SP190] FA",
          contact: "0423",
          location: "Pmp Clayton",
          shift: "06:00-18:00",
          status: "OverDue",
          nextrdq: "22/04/2018-06:00,24/04/2018-06:00"
        },
        {
          id: "2",
          date: "23/04/2018",
          nextdue: "06:00",
          nextevent: "Sign-In",
          employee: "[SP190] FA",
          contact: "0423",
          location: "Pmp Clayton",
          shift: "06:00-18:00",
          status: "OverDue",
          nextrdq: "22/04/2018-06:00,24/04/2018-06:00"
        },
        {
          id: "3",
          date: "24/04/2018",
          nextdue: "06:00",
          nextevent: "Sign-In",
          employee: "[SP190] FA",
          contact: "0423",
          location: "Pmp Clayton",
          shift: "06:00-18:00",
          status: "OverDue",
          nextrdq: "22/04/2018-06:00,24/04/2018-06:00"
        },
        {
          id: "4",
          date: "25/04/2018",
          nextdue: "06:00",
          nextevent: "Sign-In",
          employee: "[SP190] FA",
          contact: "0423",
          location: "Pmp Clayton",
          shift: "06:00-18:00",
          status: "OverDue",
          nextrdq: "22/04/2018-06:00,24/04/2018-06:00"
        },
        {
          id: "5",
          date: "26/04/2018",
          nextdue: "06:00",
          nextevent: "Sign-In",
          employee: "[SP190] FA",
          contact: "0423",
          location: "Pmp Clayton",
          shift: "06:00-18:00",
          status: "OverDue",
          nextrdq: "22/04/2018-06:00,24/04/2018-06:00"
        },
        {
          id: "6",
          date: "27/04/2018",
          nextdue: "06:00",
          nextevent: "Sign-In",
          employee: "[SP190] FA",
          contact: "0423",
          location: "Pmp Clayton",
          shift: "06:00-18:00",
          status: "OverDue",
          nextrdq: "22/04/2018-06:00,24/04/2018-06:00"
        },
        {
          id: "7",
          date: "28/04/2018",
          nextdue: "06:00",
          nextevent: "Sign-In",
          employee: "[SP190] FA",
          contact: "0423",
          location: "Pmp Clayton",
          shift: "06:00-18:00",
          status: "OverDue",
          nextrdq: "22/04/2018-06:00,24/04/2018-06:00"
        },
        {
          id: "8",
          date: "29/04/2018",
          nextdue: "06:00",
          nextevent: "Sign-In",
          employee: "[SP190] FA",
          contact: "0423",
          location: "Pmp Clayton",
          shift: "06:00-18:00",
          status: "OverDue",
          nextrdq: "22/04/2018-06:00,24/04/2018-06:00"
        },
        {
          id: "9",
          date: "30/04/2018",
          nextdue: "06:00",
          nextevent: "Sign-In",
          employee: "[SP190] FA",
          contact: "0423",
          location: "Pmp Clayton",
          shift: "06:00-18:00",
          status: "OverDue",
          nextrdq: "22/04/2018-06:00,24/04/2018-06:00"
        },
        {
          id: "10",
          date: "3/04/2018",
          nextdue: "06:00",
          nextevent: "Sign-In",
          employee: "[SP190] FA",
          contact: "0423",
          location: "Pmp Clayton",
          shift: "06:00-18:00",
          status: "OverDue",
          nextrdq: "22/04/2018-06:00,24/04/2018-06:00"
        }
      ]),
        (this.desserts2 = [
          {
            id: "1",
            qddate: "25/04/2018",
            qdtime: "06:00",
            nextevent: "10:UNASSN",
            employee: "[SP190] FA",
            contact: "0423",
            location: "18348,21600,Pmp Clayton",
            shiftdate: "25/03/18",
            sftime: "06:00-18:00",
            status: "Due",
            rtcid: "502*CSA04*18347*64800*21600",
            color: 0
          },
          {
            id: "2",
            qddate: "24/04/2018",
            qdtime: "06:00",
            nextevent: "10:UNASSN",
            employee: "[SP190] FA",
            contact: "0423",
            location: "18348,21600,Pmp Clayton",
            shiftdate: "25/03/18",
            sftime: "06:00-18:00",
            status: "Due",
            rtcid: "502*CSA04*18347*64800*21600",
            color: 1
          },
          {
            id: "3",
            qddate: "23/04/2018",
            qdtime: "06:00",
            nextevent: "10:UNASSN",
            employee: "[SP190] FA",
            contact: "0423",
            location: "18348,21600,Pmp Clayton",
            shiftdate: "25/03/18",
            sftime: "06:00-18:00",
            status: "Due",
            rtcid: "502*CSA04*18347*64800*21600",
            color: 0
          },
          {
            id: "4",
            qddate: "22/04/2018",
            qdtime: "06:00",
            nextevent: "10:UNASSN",
            employee: "[SP190] FA",
            contact: "0423",
            location: "18348,21600,Pmp Clayton",
            shiftdate: "25/03/18",
            sftime: "06:00-18:00",
            status: "Due",
            rtcid: "502*CSA04*18347*64800*21600",
            color: 1
          },
          {
            id: "5",
            qddate: "10/04/2018",
            qdtime: "06:00",
            nextevent: "10:UNASSN",
            employee: "[SP190] FA",
            contact: "0423",
            location: "18348,21600,Pmp Clayton",
            shiftdate: "25/03/18",
            sftime: "06:00-18:00",
            status: "Due",
            rtcid: "502*CSA04*18347*64800*21600",
            color: 1
          },
          {
            id: "6",
            qddate: "11/04/2018",
            qdtime: "06:00",
            nextevent: "10:UNASSN",
            employee: "[SP190] FA",
            contact: "0423",
            location: "18348,21600,Pmp Clayton",
            shiftdate: "25/03/18",
            sftime: "06:00-18:00",
            status: "Due",
            rtcid: "502*CSA04*18347*64800*21600",
            color: 0
          },
          {
            id: "7",
            qddate: "12/04/2018",
            qdtime: "06:00",
            nextevent: "10:UNASSN",
            employee: "[SP190] FA",
            contact: "0423",
            location: "18348,21600,Pmp Clayton",
            shiftdate: "25/03/18",
            sftime: "06:00-18:00",
            status: "Due",
            rtcid: "502*CSA04*18347*64800*21600",
            color: 1
          },
          {
            id: "8",
            qddate: "13/04/2018",
            qdtime: "06:00",
            nextevent: "10:UNASSN",
            employee: "[SP190] FA",
            contact: "0423",
            location: "18348,21600,Pmp Clayton",
            shiftdate: "25/03/18",
            sftime: "06:00-18:00",
            status: "Due",
            rtcid: "502*CSA04*18347*64800*21600",
            color: 0
          },
          {
            id: "9",
            qddate: "14/04/2018",
            qdtime: "06:00",
            nextevent: "10:UNASSN",
            employee: "[SP190] FA",
            contact: "0423",
            location: "18348,21600,Pmp Clayton",
            shiftdate: "25/03/18",
            sftime: "06:00-18:00",
            status: "Due",
            rtcid: "502*CSA04*18347*64800*21600",
            color: 1
          },
          {
            id: "10",
            qddate: "15/04/2018",
            qdtime: "06:00",
            nextevent: "10:UNASSN",
            employee: "[SP190] FA",
            contact: "0423",
            location: "18348,21600,Pmp Clayton",
            shiftdate: "25/03/18",
            sftime: "06:00-18:00",
            status: "Due",
            rtcid: "502*CSA04*18347*64800*21600",
            color: 0
          },
          {
            id: "11",
            qddate: "16/04/2018",
            qdtime: "06:00",
            nextevent: "10:UNASSN",
            employee: "[SP190] FA",
            contact: "0423",
            location: "18348,21600,Pmp Clayton",
            shiftdate: "25/03/18",
            sftime: "06:00-18:00",
            status: "Due",
            rtcid: "502*CSA04*18347*64800*21600",
            color: 0
          }
        ]),
        (this.codes = this.desserts);
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this code?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
<style scoped>
.toolbar1 {
  height: 140px;
}
.toolbar-div {
  text-align: center;
}
.theader {
  text-align: center;
  width: 10rem;
}
.tbody {
  text-align: center;
}
table.v-table tbody td, table.v-table tbody th {
    height: 35px;
}
</style>
