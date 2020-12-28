var valorA = 0;
var valorB = 0;

var valorAX = 0;
var valorAY = 0;
var valorBX = 0;
var valorBY = 0;

$(document).ready(function()
{
	if($(window).width() < 600)
	{
		$(".ct-chart").removeClass("ct-octave");
		$(".ct-chart").addClass("ct-square");
	}
	else
	{
		$(".ct-chart").removeClass("ct-square");
		$(".ct-chart").addClass("ct-octave");
	}
});

$(window).resize(function()
{ 
	if($(window).width() < 600)
	{
		$(".ct-chart").removeClass("ct-octave");
		$(".ct-chart").addClass("ct-square");
	}
	else
	{
		$(".ct-chart").removeClass("ct-square");
		$(".ct-chart").addClass("ct-octave");
	}
});

$(".pontoValor").blur(function()
{
	let controle = true;

	$.each($(".pontoValor"), function(index, inputValorPontos)
	{
		switch(index)
		{
			case 0:
			{
				if(inputValorPontos.value || inputValorPontos.value === 0)
				{
					valorAX = inputValorPontos.value;
				}
				else
				{
					controle = false;
					return false;
				}
				break;
			}

			case 1:
			{
				if(inputValorPontos.value || inputValorPontos.value === 0)
				{
					valorAY = inputValorPontos.value;
				}
				else
				{
					controle = false;
					return false;
				}
				break;
			}

			case 2:
			{
				if(inputValorPontos.value || inputValorPontos.value === 0)
				{
					valorBX = inputValorPontos.value;
				}
				else
				{
					controle = false;
					return false;
				}
				break;
			}

			case 3:
			{
				if(inputValorPontos.value || inputValorPontos.value === 0)
				{
					valorBY = inputValorPontos.value;
				}
				else
				{
					controle = false;
					return false;
				}
				break;
			}
		}
	});

	let funcao = "ax + b";

	if(controle)
	{
		valorA = (valorBY - valorAY) / (valorBX - valorAX);
		valorB = valorAY - (valorA * valorAX)

		if(valorB >= 0)
		{
			funcao = valorA + "x + " + valorB;
		}
		else
		{
			funcao = valorA + "x - " + (valorB * -1);
		}

		$("#calculaPontoEspecifico").css("opacity", "1");
	}
	else
	{
		$("#calculaPontoEspecifico").css("opacity", "0");
	}

	$("#informacoesFuncao > :last-child").html(funcao);
});

$(".pontoCalcular").blur(function()
{
	if(!this.value && this.value !== 0)
	{
		if(this.id == "calY")
		{
			$("#calYtela").html("y");
		}
		else
		{
			$("#calXtela").html("x");
		}

		return false;
	}

	if(this.id == "calY")
	{
		valorY = valorA * this.value + valorB;

		$("#calYtela").html(valorY);
	}
	else
	{
		valorX = (this.value - valorB)/valorA;

		$("#calXtela").html(valorX);
	}
});

var data = {
	// A labels array that can contain any sort of values
	labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
	// Our series array that contains series objects or in this case series data arrays
	series: [
		[5, 2, 4, 2, 0]
	]
};

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.
new Chartist.Line('.ct-chart', data);