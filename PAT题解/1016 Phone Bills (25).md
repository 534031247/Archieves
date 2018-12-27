🔗：https://pintia.cn/problem-sets/994805342720868352/problems/994805493648703488

### 题目大意

> 给出各个时间段的通话费用、通话记录，打印每个人的通话账单。

### 注意点

1. 给出的case不是排列好的，需要自己手动排列，有些数据可能是无效的。
2. 最后的数据要除以100，一直没搞明白为啥。。

### 算法简述

1. 结构体存储每个人的信息，结构体中的```onTime```和```offTime```需要用```vector```存储，以便于以后的插入排序操作。
2. 由于要把对应的ID的人的信息正确存储，所以需要使用```map```存储每个人的下标。
3. 存储完成后，按照时间对每个人的```onTime```和```offTime```进行排序。
4. 对每个人都ID排序整个结构体```vector```
5. 按照持续时间最短原则，找出每个```offTime```对应的```onTime```
6. 算价格

### 价格算法

直接模拟时间流逝（听起来好像很牛逼的样子= =），**让最初的时间为```onTime```，每次循环加一分钟，直到和```offTime```完全相同。**

### 代码

```c++
#include <iostream>
#include <vector>
#include <algorithm>
#include <map>
using namespace std;

const int MAX = 0x7fffffff;
int num = 0;
struct Node {
	string id;
	vector<string> onTime;
	vector<string> offTime;
};
std::vector<struct Node> person;
std::map<string, int> m;
int cost[26];

int figureMin(string off, string on)
{
	int res = 0;
	int day = 10 * (off[3] - '0') + (off[4] - '0') - 10 * (on[3] - '0') - (on[4] - '0');
	int h = 10 * (off[6] - '0') + (off[7] - '0') - 10 * (on[6] - '0') - (on[7] - '0');
	int m = 10 * (off[9] - '0') + (off[10] - '0') - 10 * (on[9] - '0') - (on[10] - '0');
	day = day * 24 * 60;
	h *= 60;
	res = day + h + m;
	return res;
}

double figureCost(string off, string on)
{
	double res = 0;
	int onD = 10 * (on[3] - '0') + (on[4] - '0');
	int onH = 10 * (on[6] - '0') + (on[7] - '0');
	int onM = 10 * (on[9] - '0') + (on[10] - '0');

	int offD = 10 * (off[3] - '0') + (off[4] - '0');
	int offH = 10 * (off[6] - '0') + (off[7] - '0');
	int offM = 10 * (off[9] - '0') + (off[10] - '0');

	while ( onM < offM || onH < offH || onD < offD ) {
		res += cost[onH];
		++onM;
		if ( onM > 59 )	{
			onM = 0;
			++onH;
		}
		if ( onH > 23 ) {
			onH = 0;
			++onD;
		}
	}
	return res;
}

int main()
{
	freopen("D://input.txt", "r", stdin);
	int temp;
	for ( int i = 0; i < 24; ++i )	cin >> cost[i];
	cin >> temp;
	for ( int i = 0; i < temp; ++i ) {
		string tempID, tempTime, condition;
		cin >> tempID >> tempTime >> condition;
//		not exists		
		if ( m.end() == m.find(tempID) ) {
			struct Node node;
			node.id = tempID;
			if ( 'n' == condition[1] )	node.onTime.push_back(tempTime);
			else node.offTime.push_back(tempTime);
			person.push_back(node);
			m.insert(pair<string, int> (tempID, num++));
		}
//		exists	
		else {
			int thisIndex = m[tempID];
			if ( 'n' == condition[1] )	person[thisIndex].onTime.push_back(tempTime);
			else person[thisIndex].offTime.push_back(tempTime);
		}	
	}
//	sort the time&id
	for ( int i = 0; i < num; ++i ) {
		sort(person[i].onTime.begin(), person[i].onTime.end());
		sort(person[i].offTime.begin(), person[i].offTime.end());
	}	
	sort(person.begin(), person.end(), [](struct Node a, struct Node b) {
		return a.id < b.id;
	});
	for ( int index = 0; index < num; ++index ) {
		double sum = 0;
		int id_flag = true;
//		mark the next start index		
		int start = 0;
//		find a record		
		for ( int i = 0; i < person[index].offTime.size(); ++i ) {
			string off = person[index].offTime[i];
			int thisMin = MAX;
			for ( int j = start; j < person[index].onTime.size(); ++j ) {
				string on = person[index].onTime[j];
				if ( off <= on )	continue;
				temp = figureMin(off, on);
				if ( temp < thisMin ) {
					thisMin = temp;
					start = j + 1;
				}
			}
//			found			
			if ( MAX != thisMin ) {
				if ( id_flag ) {
					cout << person[index].id << " ";
					cout << person[index].onTime[0][0] << person[index].onTime[0][1];
					cout << endl;
					id_flag = false;
				}
				for ( int j = 3; j < 11; ++j )	cout << person[index].onTime[start - 1][j];
				cout << " ";
				for ( int j = 3; j < 11; ++j )	cout << off[j];
				cout << " " << thisMin << " $";
				double tempSum = figureCost(off, person[index].onTime[start - 1]) / 100;
				sum += tempSum;
				printf("%.2lf\n", tempSum);
			}
		}
		if ( !id_flag ) {
			cout << "Total amount: $";
			printf("%.2lf\n", sum);
		}
	}
	return 0;
}

```

### 总结

```map```的插入：```map.insert(pair<string, int> (key, value))```

```map```的查找：```map.find(value)```，没找着：```map.end() == map.find(value)```

```map```的```value```值获取：```map[key]```

`map`的遍历:

```c++
for ( map<string, int> :: iterator item = dic.begin(); item != dic.end(); ++item) {
                if ( item -> second > temp ) {
                        res = item -> first;
                        temp = item -> second;
                }
        }

```

`first`和`second`分别表示`key`和`value`。