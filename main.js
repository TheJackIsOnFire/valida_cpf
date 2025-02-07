//97. Exercício - Validando um CPF (Algoritmo)

//Método de validação

// 705.484.450-52 070.987.720-03
/*
7x  0x 5x 4x 8x 4x 4x 5x 0x
10  9  8  7  6  5  4  3  2
70  0  40 28 48 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.

7x  0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10  9  8  7  6  5  4  3  2
77  0  45 32 56 24 20 20 0  10 = 284

11 - (284 % 11) = 2 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.
*/

/*
    1° - Criar um objeto que vai receber o cpf e exibir o seu valor (get)

        - O objeto vai receber uma string com caracteres especiais
        - Retornar o valor sem os caracteres especiais
*/

/*
    2° - Criar os protótipos 

        - Criar uma função para verificar se o cpf é válido dentro dos protótipos
        - Verificar se o valor não é undefined
        - Verificar se é realmente um cpf com 11 números
        - Filtrar os primeiros 9 dígitos

        - O método de validação está descrito acima
        - Criar uma função para realizar o método

        - Transformar o cpf em um array

        - Criar uma variável para decrementar e realizar a multiplicação
            let decrement = cpf.length + 1

        - Multiplicar os valores dos dígitos do cpf 
        - Usar o reducer para somar os valores (lembre-se que os valores são strings então os converta para numbers)

        - Pegar a soma dos valores e realizar a seguinte conta:
            - (11 - (soma dos valores % 11)) = ao penúltimo número

            - Se o número do dígito for maior que 9, vamos considerar 0.         

            - O valor encontrado será do primeiro dígito ou seja do penúltimo número do cpf

        - Concatenar o penúltimo dígito ao número do cpf sem os 2 dígitos
        - Jogar o valor na função que realiza a conta para descobrir o segundo dígito (ou o último número)
        
        - Comparar o número gerado com o número original
            - se os valores forem iguais o cpf é válido 

*/

// Função construtora
const ValidateCpf = function (cpf) {
	// Define as propriedades de justCpfNumbers
	Object.defineProperty(this, 'justCpfNumbers', {
		enumerable: true,
		// Exibe apenas os números do cpf
		get: function () {
			return cpf.replace(/\D+/g, ''); // (Essa expressão regular retira da string tudo que não representa números)
		},
	});
};

// Protótipos de ValidaCpf
ValidateCpf.prototype.isValid = function () {
	// Faz verificações antes de verificar se o cpf é válido
	if (typeof this.justCpfNumbers === 'undefined') return false;
	if (this.justCpfNumbers.length !== 11) return false;
	if (this.isSequence()) return false;

	// Retira os dois últimos dígitos do cpf
	const filterCpf = this.justCpfNumbers.slice(0, -2);

	// Dígitos
	const digit1 = this.validationMethod(filterCpf);
	const digit2 = this.validationMethod(filterCpf + digit1);

	// Cpf com os dígitos verificadores
	const newCpfCheck = filterCpf + digit1 + digit2;

	return newCpfCheck === this.justCpfNumbers ? true : false;
};

// Método de validação
ValidateCpf.prototype.validationMethod = function (filterCpf) {
	// Transforma o cpf de uma string para um array
	const cpfArray = Array.from(filterCpf);

	// Esta variável será usada para multiplicar os valores do cpf
	let decrement = cpfArray.length + 1;

	// Retorna a soma dos valores multiplicados pela variável decrement
	const totalMultiplication = cpfArray.reduce((accumulator, value) => {
		accumulator += decrement * Number(value);
		decrement--;
		return accumulator;
	}, 0);

	// Retorna o dígito verificador
	const checkDigit = 11 - (totalMultiplication % 11);

	return checkDigit > 9 ? '0' : String(checkDigit);
};

// Verifica se o cpf é ou não uma sequência de números repetidos
ValidateCpf.prototype.isSequence = function () {
	const sequence = this.justCpfNumbers[0].repeat(this.justCpfNumbers.length);
	return sequence === this.justCpfNumbers;
};

// Instância
// const cpfTest = new ValidateCpf('070.987.720-03');
// console.log(cpfTest.justCpfNumbers);
// console.log(cpfTest.isValid());

const form = document.querySelector('form');
const inputCpf = form.querySelector('#input-teste-1');

let cpfValue = ''; // Variável para armazenar o valor do CPF

inputCpf.addEventListener('change', function (event) {
	cpfValue = event.target.value; // Atualiza o CPF quando o usuário muda o valor
});

form.addEventListener('submit', function (event) {
	event.preventDefault();

	let cpfValidate = new ValidateCpf(cpfValue); // Usa o CPF atualizado

	if (cpfValidate.isValid()) {
		inputCpf.style.border = '2px solid green';
		alert('CPF válido');
	} else {
		inputCpf.style.border = '2px solid red';
		alert('CPF inválido');
	}
});
