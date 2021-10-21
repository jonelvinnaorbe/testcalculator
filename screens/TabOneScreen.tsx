import * as React from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import ButtonSwitch from '../components/ButtonSwitch';
import { RootTabScreenProps } from '../types';
import { getStatusBarHeight } from 'react-native-status-bar-height';

var romanMatrix = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I']
];

function convertToRoman(num) {
  if (num === 0 || !num) {
    return '';
  }
  for (var i = 0; i < romanMatrix.length; i++) {
    if (num >= romanMatrix[i][0]) {
      return romanMatrix[i][1] + convertToRoman(num - romanMatrix[i][0]);
    }
  }
}

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [numType, setNumType] = useState('arabic');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [operation, setOperation] = useState('');
  const [completeInput, setCompleteInput] = useState('');
  const [romanText, setRomanText] = useState('')

  const numKeys = [
    {
      'arabic': '1',
      'roman': 'I'
    },
    {
      'arabic': '2',
      'roman': 'II'
    },
    {
      'arabic': '3',
      'roman': 'III'
    },
    {
      'arabic': '4',
      'roman': 'IV'
    },
    {
      'arabic': '5',
      'roman': 'V'
    },
    {
      'arabic': '6',
      'roman': 'VI'
    },
    {
      'arabic': '7',
      'roman': 'VII'
    },
    {
      'arabic': '8',
      'roman': 'VIII'
    },
    {
      'arabic': '9',
      'roman': 'IX'
    },
  ]

  const onOperation = (value) => {
    setOperation(value)
  }

  const onNum = (value) => {
    if (!operation) {
      setInput1(input1 + value.arabic)
    } else {
      setInput2(input2 + value.arabic)
    }
  }

  const onCompute = () => {
    const total = eval(String(completeInput)).toFixed(2);
    setCompleteInput(String(total));
    setInput1(total)
    setInput2('')
    setOperation('')
  }

  const clearFields = () => {
    setCompleteInput('');
    setInput1('')
    setInput2('')
    setOperation('')
    setRomanText('')
  }

  useEffect(() => {
    setCompleteInput(input1 + operation + input2);
    if(numType == "roman" && input1){
      setRomanText(convertToRoman(input1) + operation + convertToRoman(input2));
    }
  }, [input1, input2, operation, numType])

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity style={styles.button} onPress={() => {
          if (numType == "arabic") {
            setNumType('roman')
          } else {
            setNumType('arabic')
          }
        }}>
          <Text style={styles.buttonText}>Switch to: {numType == "arabic" ? "Roman" : "Arabic"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.button, backgroundColor: 'gray'}} onPress={() => clearFields()}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TextInput style={styles.resultInput}
          value={numType == "arabic" ? completeInput : romanText}
          placeholder=""
          editable={false}
        />
      </View>
      <View style={styles.bottom}>
        <View style={[styles.inputsTop, styles.inputs]}>
          <TouchableOpacity style={styles.input} onPress={() => onOperation('+')}>
            <ButtonSwitch label="+" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={() => onOperation('-')}>
            <ButtonSwitch label="-" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={() => onOperation('*')}>
            <ButtonSwitch label="x" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={() => onOperation('/')}>
            <ButtonSwitch label="/" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.input} onPress={() => onCompute()}>
            <ButtonSwitch label="=" />
          </TouchableOpacity>
        </View>
        <View style={[styles.inputs, styles.inputsBottom]}>
          {
            numKeys.map((n, index) => {
              return (
                <TouchableOpacity style={styles.inputBottom} onPress={() => onNum(n)}>
                  <ButtonSwitch label={n[numType]} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingTop: getStatusBarHeight()
  },
  top: {
    flex: 1,
    width: '100%',
    padding: 8
  },
  bottom: {
    height: Dimensions.get('window').height * .6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  inputsTop: {

  },
  inputsBottom: {
    flex: 2,
  },
  input: {
    flex: 1,
    padding: 8
  },
  inputBottom: {
    width: '33.33%',
    height: 100,
    maxWidth: '33.33%',
    padding: 7
  },
  resultInput: {
    backgroundColor: 'white',
    flex: 1,
    fontSize: 50,
    color: '#000'
  },
  button: {
    backgroundColor: 'blue',
    padding: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  }
});
